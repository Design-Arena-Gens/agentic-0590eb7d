import { NextResponse } from "next/server";
import { generateWorkflowPlan, WorkflowInput } from "@/lib/workflow";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WorkflowInput;
    const requiredFields: Array<keyof WorkflowInput> = [
      "channelName",
      "channelTopic",
      "tone",
      "cadencePerWeek",
      "goals",
      "automationLevel",
      "preferredPublishTime",
      "monetizationTarget",
      "includeShorts",
      "notes",
    ];

    for (const field of requiredFields) {
      if (payload[field] === undefined || payload[field] === null) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    if (!Array.isArray(payload.goals) || payload.goals.length === 0) {
      return NextResponse.json(
        { error: "Select at least one automation goal." },
        { status: 400 },
      );
    }

    const plan = generateWorkflowPlan(payload);
    return NextResponse.json(plan);
  } catch (error) {
    console.error("Workflow generation error", error);
    return NextResponse.json(
      { error: "Unable to build workflow plan." },
      { status: 500 },
    );
  }
}
