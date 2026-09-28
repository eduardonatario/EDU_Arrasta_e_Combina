export interface ItemConfig {
  id: string;
  name: string;
  targetImageUrl: string;
  sourceImageUrl: string;
  explanation: string;
}

export interface WidgetConfig {
  title: string;
  subtitle: string;
  items: ItemConfig[];
  globalExplanation: string;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showSuccessMessage?: boolean;
  showInstruction?: boolean;
  showReview?: boolean;
  showProgressBar?: boolean;
}
