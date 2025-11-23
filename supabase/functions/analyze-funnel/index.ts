import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.84.0';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FunnelAnalysis {
  funnel_id: string;
  funnel_name: string;
  completion_rate: number;
  total_entries: number;
  completions: number;
}

interface DropOffData {
  step_number: number;
  step_name: string;
  sessions_reached: number;
  drop_off_rate: number;
}

interface CohortData {
  cohort_name: string;
  completion_rate: number;
  total_entries: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate input
    const requestSchema = z.object({
      funnel_id: z.string().uuid()
    });

    const body = await req.json();
    const { funnel_id } = requestSchema.parse(body);

    if (!funnel_id) {
      return new Response(
        JSON.stringify({ error: 'funnel_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch funnel analytics
    const { data: funnelData, error: funnelError } = await supabase
      .from('funnel_analytics')
      .select('*')
      .eq('funnel_id', funnel_id)
      .single();

    if (funnelError) throw funnelError;

    // Fetch drop-off data
    const { data: dropOffData, error: dropOffError } = await supabase
      .rpc('get_funnel_dropoff', {
        funnel_id_param: funnel_id,
        days_back: 30
      });

    if (dropOffError) throw dropOffError;

    // Fetch cohort data for all segment types
    const cohortTypes = ['language', 'device', 'referrer'];
    const cohortAnalysis: Record<string, CohortData[]> = {};

    for (const cohortType of cohortTypes) {
      const { data, error } = await supabase.rpc('get_funnel_cohort_analysis', {
        funnel_id_param: funnel_id,
        cohort_type: cohortType,
        days_back: 30
      });

      if (!error && data) {
        cohortAnalysis[cohortType] = data;
      }
    }

    // Prepare data for AI analysis
    const analysisData = {
      funnel: funnelData as FunnelAnalysis,
      dropOff: dropOffData as DropOffData[],
      cohorts: cohortAnalysis
    };

    // Create detailed prompt for AI
    const prompt = `You are a conversion rate optimization expert analyzing a funnel. Provide 5-7 specific, actionable recommendations to improve conversion rates.

Funnel Overview:
- Name: ${analysisData.funnel.funnel_name}
- Completion Rate: ${analysisData.funnel.completion_rate}%
- Total Entries: ${analysisData.funnel.total_entries}
- Completions: ${analysisData.funnel.completions}

Drop-off Analysis:
${analysisData.dropOff.map(step => 
  `- Step ${step.step_number} (${step.step_name}): ${step.sessions_reached} users reached, ${step.drop_off_rate}% dropped off`
).join('\n')}

Cohort Performance:
${Object.entries(analysisData.cohorts).map(([type, cohorts]) => 
  `${type.toUpperCase()}: ${cohorts.map((c: CohortData) => 
    `${c.cohort_name} (${c.completion_rate}% conversion, ${c.total_entries} entries)`
  ).join(', ')}`
).join('\n')}

Provide recommendations in the following format:
1. **[Priority: High/Medium/Low] Title**
   - Issue: [What's the problem]
   - Impact: [Expected improvement]
   - Action: [Specific steps to implement]

Focus on:
- Steps with highest drop-off rates
- Underperforming cohorts vs best-performing cohorts
- Quick wins vs long-term improvements
- Data-driven insights with specific numbers`;

    // Call Lovable AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a conversion rate optimization expert specializing in funnel analysis. Provide clear, actionable, data-driven recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorText = await aiResponse.text();
      console.error('Lovable AI error:', aiResponse.status, errorText);
      throw new Error('Failed to get AI recommendations');
    }

    const aiData = await aiResponse.json();
    const recommendations = aiData.choices[0].message.content;

    return new Response(
      JSON.stringify({
        success: true,
        funnel: analysisData.funnel,
        recommendations,
        analyzed_at: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error: any) {
    console.error('Error in analyze-funnel function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});