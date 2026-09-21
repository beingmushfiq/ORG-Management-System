/**
 * Wallet Pass & Physical Card Print Helper
 * Specifications for Apple Wallet (.pkpass), Google Wallet Generic Pass, and 300 DPI CR80 PVC Card Printing.
 */

export interface MemberPassData {
  organizationId: string;
  organizationName: string;
  organizationNameBn: string;
  memberId: string;
  fullName: string;
  fullNameBn: string;
  tier: "ASSOCIATE" | "GENERAL" | "LIFE" | "HONORARY";
  branchName: string;
  bloodGroup?: string;
  joinedDate: string;
  validThrough: string;
  securityHash: string;
  qrPayloadUrl: string;
  primaryColorHex?: string;
  logoUrl?: string;
}

/**
 * Generates an Apple Wallet pass.json structure
 * Conforms to Apple PKPass standard for storeCard
 */
export function generateAppleWalletPassJson(data: MemberPassData) {
  const primaryColor = data.primaryColorHex || "#0f172a";
  const tierDisplay = data.tier.charAt(0) + data.tier.slice(1).toLowerCase() + " Member";

  return {
    formatVersion: 1,
    passTypeIdentifier: "pass.bd.org.membercard",
    serialNumber: data.memberId,
    teamIdentifier: "ORG_TEAM_ID",
    organizationName: data.organizationName,
    description: `${data.organizationName} Official Digital Credential`,
    foregroundColor: "rgb(255, 255, 255)",
    backgroundColor: primaryColor,
    labelColor: "rgb(148, 163, 184)",
    logoText: data.organizationName,
    barcodes: [
      {
        format: "PKBarcodeFormatQR",
        message: data.qrPayloadUrl,
        messageEncoding: "iso-8859-1",
        altText: `ID: ${data.memberId}`,
      },
    ],
    storeCard: {
      headerFields: [
        {
          key: "tier",
          label: "TIER",
          value: tierDisplay,
        },
      ],
      primaryFields: [
        {
          key: "member",
          label: "MEMBER NAME",
          value: data.fullName,
        },
      ],
      secondaryFields: [
        {
          key: "memberId",
          label: "MEMBER ID",
          value: data.memberId,
        },
        {
          key: "branch",
          label: "BRANCH / UNIT",
          value: data.branchName,
        },
      ],
      auxiliaryFields: [
        {
          key: "validity",
          label: "VALIDITY",
          value: data.validThrough,
        },
        ...(data.bloodGroup
          ? [
              {
                key: "blood",
                label: "BLOOD GROUP",
                value: data.bloodGroup,
              },
            ]
          : []),
      ],
      backFields: [
        {
          key: "issuer",
          label: "ISSUING BODY",
          value: `${data.organizationName} (${data.organizationNameBn})`,
        },
        {
          key: "hash",
          label: "SECURITY SEAL (SHA-256)",
          value: data.securityHash,
        },
        {
          key: "terms",
          label: "TERMS OF USE",
          value:
            "This digital credential is the property of the issuing organization and verifies active constitutional standing. Report loss immediately to the Secretariat.",
        },
      ],
    },
  };
}

/**
 * Generates Google Wallet Generic Pass JSON object
 */
export function generateGoogleWalletPassJson(data: MemberPassData) {
  return {
    id: `${data.organizationId}.${data.memberId.replace(/[^a-zA-Z0-9]/g, "_")}`,
    classId: `${data.organizationId}.membership_class`,
    genericType: "GENERIC_MEMBERSHIP_CARD",
    cardTitle: {
      defaultValue: {
        language: "en-US",
        value: data.organizationName,
      },
    },
    header: {
      defaultValue: {
        language: "en-US",
        value: data.fullName,
      },
    },
    subheader: {
      defaultValue: {
        language: "en-US",
        value: `${data.tier} MEMBER · ${data.memberId}`,
      },
    },
    barcode: {
      type: "QR_CODE",
      value: data.qrPayloadUrl,
      alternateText: data.memberId,
    },
    hexBackgroundColor: "#0f172a",
    textModulesData: [
      {
        header: "Branch",
        body: data.branchName,
        id: "branch_info",
      },
      {
        header: "Valid Through",
        body: data.validThrough,
        id: "validity_info",
      },
      {
        header: "Verification Seal",
        body: data.securityHash.substring(0, 16) + "...",
        id: "seal_info",
      },
    ],
  };
}

/**
 * 300 DPI CR80 Standard PVC Card Print Specifications
 * ISO/IEC 7810 ID-1 standard:
 * Physical: 85.60 mm × 53.98 mm (3.370 in × 2.125 in)
 * Print Resolution: 300 DPI
 * Pixel Dimensions: 1011 × 638 px (with 3mm / 35px bleed: 1082 × 709 px)
 */
export const CR80_PVC_PRINT_SPEC = {
  standard: "ISO/IEC 7810 ID-1 (CR80)",
  widthMm: 85.6,
  heightMm: 53.98,
  bleedMm: 3.0,
  targetDpi: 300,
  dimensionsPx300Dpi: {
    width: 1011,
    height: 638,
    widthWithBleed: 1082,
    heightWithBleed: 709,
  },
  cornerRadiusMm: 3.18,
  colorSpace: "CMYK (FOGRA39 or US Web Coated SWOP v2)",
  substrate: "Polyvinyl Chloride (PVC) 30 mil (0.76 mm) with gloss / matte lamination",
};
