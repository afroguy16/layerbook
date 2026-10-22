export type BirdBucket = "under500" | "500to2k" | "2kto10k" | "10kplus";
export type WhoLogs = "me" | "manager" | "attendants";

export const BIRD_OPTIONS: { value: BirdBucket; label: string }[] = [
  { value: "under500", label: "Under 500" },
  { value: "500to2k", label: "500 to 2,000" },
  { value: "2kto10k", label: "2,000 to 10,000" },
  { value: "10kplus", label: "10,000+" },
];

export const WHO_OPTIONS: { value: WhoLogs; label: string }[] = [
  { value: "me", label: "Me" },
  { value: "manager", label: "Manager" },
  { value: "attendants", label: "Attendants" },
];

export type IntakeValues = {
  name: string;
  phone: string;
  email: string;
  farm: string;
  birds: BirdBucket | null;
  who: WhoLogs[];
};

export type IntakeField = keyof IntakeValues;

export type Touched = Partial<Record<IntakeField, boolean>>;

export type IntakeAnswers = {
  wish: string;
};

export type IntakePayload =
  | { kind: "intake"; values: IntakeValues }
  | { kind: "answers"; values: IntakeValues; answers: IntakeAnswers };

export type SubmitResult = { ok: true } | { ok: false; error: string };

export const emptyValues: IntakeValues = {
  name: "",
  phone: "",
  email: "",
  farm: "",
  birds: null,
  who: [],
};

export const emptyAnswers: IntakeAnswers = {
  wish: "",
};
