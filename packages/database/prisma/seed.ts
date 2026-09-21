import { PrismaClient, MembershipTier, MemberStatus, InvoiceStatus, PaymentMethod } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.info("🌱 Starting database seed...");

  // 1. Create Demo Organization (Tenant)
  const tenant = await prisma.organization.upsert({
    where: { slug: "bma-ctg" },
    update: {},
    create: {
      name: "Bangladesh Medical Association — Chattogram",
      nameBn: "বাংলাদেশ মেডিকেল এসোসিয়েশন — চট্টগ্রাম",
      slug: "bma-ctg",
      tagline: "Dedicated to Medical Excellence & Humane Healthcare Since 1972",
      taglineBn: "১৯৭২ সাল থেকে চিকিৎসা উৎকর্ষ ও মানবিক স্বাস্থ্যসেবায় নিবেদিত",
      primaryColorHsl: "221 83% 53%", // Deep Royal Blue
      accentColorHsl: "38 92% 50%",   // Warm Amber Gold
      contactEmail: "secretariat@bma-ctg.org",
      contactPhone: "+880 1819 000111",
      headOfficeAddress: "BMA Bhaban, K.B. Fazlul Kader Road, Chattogram",
      headOfficeAddressBn: "বিএমএ ভবন, কে.বি. ফজলুল কাদের রোড, চট্টগ্রাম",
      aboutHtml: "<p>The premier association uniting physicians and surgeons across Chattogram Division.</p>",
      aboutHtmlBn: "<p>চট্টগ্রাম বিভাগের চিকিৎসক ও সার্জনদের প্রতিনিধিত্বকারী শীর্ষ প্রতিষ্ঠান।</p>",
      eligibilityRuleJson: {
        associateToGeneral: {
          minContinuousActiveDays: 730, // 2 Years
          requireZeroDues: true,
          minActivityPoints: 50,
        },
        generalToLife: {
          minContinuousActiveDays: 1460, // 4 Years
          requireZeroDues: true,
          minActivityPoints: 120,
        },
      },
      smsGatewayConfigJson: {
        provider: "SSL_WIRELESS",
        senderId: "BMA-CTG",
        apiKeyConfigured: false,
      },
    },
  });

  console.info(`✅ Seeded Organization: ${tenant.name} (${tenant.slug})`);

  // 2. Create Branch Hierarchy (Materialized Path + Adjacency List)
  const centralNode = await prisma.branchNode.create({
    data: {
      organizationId: tenant.id,
      name: "Central Executive Secretariat",
      nameBn: "কেন্দ্রীয় কার্যনির্বাহী সচিবালয়",
      code: "CENTRAL",
      levelLabel: "Central HQ",
      depth: 0,
      materializedPath: "1",
    },
  });

  const divisionNode = await prisma.branchNode.create({
    data: {
      organizationId: tenant.id,
      parentId: centralNode.id,
      name: "Chattogram Metropolitan Division",
      nameBn: "চট্টগ্রাম মহানগর বিভাগ",
      code: "CTG-METRO",
      levelLabel: "Division",
      depth: 1,
      materializedPath: `${centralNode.materializedPath}/4`,
    },
  });

  const branchUnit = await prisma.branchNode.create({
    data: {
      organizationId: tenant.id,
      parentId: divisionNode.id,
      name: "Panchlaish Medical College Unit",
      nameBn: "পাঁচলাইশ মেডিকেল কলেজ ইউনিট",
      code: "PANCHLAISH",
      levelLabel: "Unit Branch",
      depth: 2,
      materializedPath: `${divisionNode.materializedPath}/12`,
    },
  });

  console.info(`✅ Seeded Branch Hierarchy: ${centralNode.name} -> ${divisionNode.name} -> ${branchUnit.name}`);

  // 3. Create Key Governance Positions
  const presidentPos = await prisma.position.create({
    data: {
      organizationId: tenant.id,
      title: "President",
      titleBn: "সভাপতি",
      rankOrder: 1,
      isCentralRole: true,
      defaultPermissions: ["MEMBERS:ALL", "FINANCE:ALL", "GOVERNANCE:ALL", "CIRCULAR:SIGN"],
    },
  });

  const gsPos = await prisma.position.create({
    data: {
      organizationId: tenant.id,
      title: "General Secretary",
      titleBn: "সাধারণ সম্পাদক",
      rankOrder: 2,
      isCentralRole: true,
      defaultPermissions: ["MEMBERS:ALL", "FINANCE:ALL", "GOVERNANCE:ALL", "CIRCULAR:SIGN", "EVENTS:ALL"],
    },
  });

  const branchSecretaryPos = await prisma.position.create({
    data: {
      organizationId: tenant.id,
      title: "Branch Organizing Secretary",
      titleBn: "শাখা সাংগঠনিক সম্পাদক",
      rankOrder: 10,
      isCentralRole: false,
      defaultPermissions: ["MEMBERS:VIEW", "MEMBERS:ENDORSE", "EVENTS:CREATE", "ATTENDANCE:SCAN"],
    },
  });

  // 4. Create Demo Admin / Executive User
  const demoLeader = await prisma.user.create({
    data: {
      organizationId: tenant.id,
      email: "president@bma-ctg.org",
      phone: "+8801819000001",
      passwordHash: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyUIXe/0FgpT3N.rYqWwzLqfI4p2FkK.", // hashed demo password
      fullName: "Prof. Dr. Mujibul Haque",
      fullNameBn: "অধ্যাপক ডাঃ মুজিবুল হক",
      bloodGroup: "B+",
      occupation: "Consultant Cardiologist",
      bio: "Fellow of Royal College of Physicians, serving community healthcare.",
    },
  });

  // Assign Central President Position
  await prisma.userPosition.create({
    data: {
      organizationId: tenant.id,
      userId: demoLeader.id,
      positionId: presidentPos.id,
      branchNodeId: centralNode.id,
      committeeTermName: "Executive Council 2026-2028",
      termStartDate: new Date("2026-01-01"),
      isActive: true,
    },
  });

  // Create Life Membership Record
  await prisma.membership.create({
    data: {
      organizationId: tenant.id,
      userId: demoLeader.id,
      tier: MembershipTier.LIFE,
      status: MemberStatus.ACTIVE,
      membershipNumber: "BMA-LIFE-0001",
      securityHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    },
  });

  // 5. Seed Public Notices & Events
  await prisma.notice.create({
    data: {
      organizationId: tenant.id,
      title: "Notice: 52nd Annual General Meeting (AGM) 2026",
      titleBn: "বিজ্ঞপ্তি: ৫২তম বার্ষিক সাধারণ সভা (এজিএম) ২০২৬",
      contentHtml: "<p>All general and life members are cordially invited to attend the 52nd AGM at Grand Sultan Hall.</p>",
      contentHtmlBn: "<p>সকল সাধারণ ও আজীবন সদস্যদের গ্র্যান্ড সুলতান হলে অনুষ্ঠিতব্য ৫২তম বার্ষিক সাধারণ সভায় উপস্থিত থাকার জন্য বিনীত অনুরোধ জানানো হচ্ছে।</p>",
      isPublic: true,
      isPinned: true,
    },
  });

  await prisma.event.create({
    data: {
      organizationId: tenant.id,
      branchNodeId: centralNode.id,
      title: "Annual Scientific Medical Congress & Gala 2026",
      titleBn: "বার্ষিক বৈজ্ঞানিক সম্মেলন ও গালা ২০২৬",
      description: "Two-day conference featuring international clinical research papers and CME workshops.",
      venue: "Radisson Blu Chattogram Bay View",
      venueBn: "র‌্যাডিসন ব্লু চট্টগ্রাম বে ভিউ",
      startTime: new Date("2026-10-15T09:00:00Z"),
      endTime: new Date("2026-10-16T18:00:00Z"),
      ticketFeePaisa: BigInt(250000), // ৳2,500.00
      pointsAwarded: 25,
      isPublic: true,
    },
  });

  console.info("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
