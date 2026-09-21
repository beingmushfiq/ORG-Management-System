/**
 * Bilingual Message Template Engine with GSM / UCS-2 Segment Analytics
 */

export interface MessageTemplate {
  id: string;
  key: string;
  name: string;
  templateEn: string;
  templateBn: string;
  category: "DUES_REMINDER" | "EVENT_INVITATION" | "TIER_PROMOTION" | "EMERGENCY_BROADCAST";
}

export interface RenderTemplateOptions {
  template: MessageTemplate;
  locale: "en" | "bn";
  variables: Record<string, string | number>;
}

export interface RenderedMessage {
  renderedText: string;
  locale: "en" | "bn";
  isUnicode: boolean;
  charCount: number;
  segmentsCount: number;
  maxCharsInCurrentSegment: number;
}

export class TemplateEngine {
  /**
   * Replaces dynamic placeholders {{variable}} in the template string
   */
  static render(options: RenderTemplateOptions): RenderedMessage {
    const rawTemplate =
      options.locale === "bn" ? options.template.templateBn : options.template.templateEn;

    let text = rawTemplate;
    for (const [key, val] of Object.entries(options.variables)) {
      const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      text = text.replace(pattern, String(val));
    }

    const isUnicode = /[\u0980-\u09FF]/.test(text);
    const charCount = text.length;

    let segmentsCount = 1;
    let maxCharsInCurrentSegment = 160;

    if (isUnicode) {
      if (charCount <= 70) {
        segmentsCount = 1;
        maxCharsInCurrentSegment = 70;
      } else {
        segmentsCount = Math.ceil(charCount / 67);
        maxCharsInCurrentSegment = segmentsCount * 67;
      }
    } else {
      if (charCount <= 160) {
        segmentsCount = 1;
        maxCharsInCurrentSegment = 160;
      } else {
        segmentsCount = Math.ceil(charCount / 153);
        maxCharsInCurrentSegment = segmentsCount * 153;
      }
    }

    return {
      renderedText: text,
      locale: options.locale,
      isUnicode,
      charCount,
      segmentsCount,
      maxCharsInCurrentSegment,
    };
  }

  /**
   * Built-in template repository for typical organization operations
   */
  static readonly STANDARD_TEMPLATES: Record<string, MessageTemplate> = {
    DUES_OVERDUE: {
      id: "tpl-dues-overdue",
      key: "DUES_OVERDUE",
      name: "Overdue Dues Warning",
      category: "DUES_REMINDER",
      templateEn:
        "Dear {{name}} ({{membershipId}}), your {{period}} membership dues of ৳{{amount}} are overdue since {{dueDate}}. Please settle via portal: {{paymentLink}} - {{orgName}}",
      templateBn:
        "শ্রদ্ধেয় {{name}} ({{membershipId}}), আপনার {{period}} মেম্বারশিপ ফি ৳{{amount}} বকেয়া রয়েছে (শেষ সময়: {{dueDate}})। পরিশোধ লিংক: {{paymentLink}} - {{orgName}}",
    },
    TIER_UNLOCKED: {
      id: "tpl-tier-unlocked",
      key: "TIER_UNLOCKED",
      name: "Promotion Eligibility Achieved",
      category: "TIER_PROMOTION",
      templateEn:
        "Congratulations {{name}}! You have fulfilled all criteria to apply for {{targetTier}} Membership in {{orgName}}. Review & apply at: {{portalLink}}",
      templateBn:
        "অভিনন্দন {{name}}! আপনি {{orgName}}-এ {{targetTier}} মেম্বারশিপের যোগ্যতা অর্জন করেছেন। আবেদন করুন: {{portalLink}}",
    },
    EMERGENCY_CIRCULAR: {
      id: "tpl-emergency-broadcast",
      key: "EMERGENCY_CIRCULAR",
      name: "Priority Executive Circular",
      category: "EMERGENCY_BROADCAST",
      templateEn:
        "URGENT: Executive Directive from {{orgName}}. {{headline}}. Official notice: {{noticeLink}}",
      templateBn:
        "জরুরী বিজ্ঞপ্তি: {{orgName}} এর নির্বাহী নির্দেশনা। {{headline}}। বিস্তারিত: {{noticeLink}}",
    },
  };
}
