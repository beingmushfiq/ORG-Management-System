/// <reference types="node" />
import {
  prisma,
  MembershipTier,
  MemberStatus,
  InvoiceStatus,
  PaymentMethod,
  MeetingStatus,
} from "../src";

async function main() {
  console.info("🌱 Starting database seed...");

  // 1. Create Demo Organization (Tenant): Road Safety Movement
  const tenant = await prisma.organization.upsert({
    where: { slug: "rsm-bd" },
    update: {
      name: "Road Safety Movement",
      nameBn: "নিরাপদ সড়ক আন্দোলন",
      tagline: "Building a Safe, Sustainable, and Humane Road Transport System for All",
      taglineBn: "একটি নিরাপদ, টেকসই ও মানবিক সড়ক যোগাযোগ ব্যবস্থা গড়ে তোলার প্রত্যয়ে",
      primaryColorHsl: "38 92% 50%", // Safety Amber
      accentColorHsl: "160 84% 39%",  // Signal Emerald
      contactEmail: "secretariat@roadsafetymovement.org",
      contactPhone: "+880 1819 778899",
      headOfficeAddress: "National Secretariat, Dhaka, Bangladesh",
      headOfficeAddressBn: "জাতীয় সচিবালয়, ঢাকা, বাংলাদেশ",
    },
    create: {
      name: "Road Safety Movement",
      nameBn: "নিরাপদ সড়ক আন্দোলন",
      slug: "rsm-bd",
      tagline: "Building a Safe, Sustainable, and Humane Road Transport System for All",
      taglineBn: "একটি নিরাপদ, টেকসই ও মানবিক সড়ক যোগাযোগ ব্যবস্থা গড়ে তোলার প্রত্যয়ে",
      primaryColorHsl: "38 92% 50%", // Safety Amber
      accentColorHsl: "160 84% 39%",  // Signal Emerald
      contactEmail: "secretariat@roadsafetymovement.org",
      contactPhone: "+880 1819 778899",
      headOfficeAddress: "National Secretariat, Dhaka, Bangladesh",
      headOfficeAddressBn: "জাতীয় সচিবালয়, ঢাকা, বাংলাদেশ",
      aboutHtml: "<p>Road Safety Movement is a non-profit and voluntary organization that emerged from the historic 2018 Students' Safe Road Movement in Bangladesh.</p>",
      aboutHtmlBn: "<p>নিরাপদ সড়ক আন্দোলন ২০১৮ সালের ঐতিহাসিক শিক্ষার্থীদের নিরাপদ সড়ক আন্দোলন থেকে প্রতিষ্ঠিত একটি অলাভজনক ও স্বেচ্ছাসেবী নাগরিক প্ল্যাটফর্ম।</p>",
      eligibilityRuleJson: {
        associateToGeneral: {
          minContinuousActiveDays: 365,
          requireZeroDues: true,
          minActivityPoints: 30,
        },
        generalToLife: {
          minContinuousActiveDays: 730,
          requireZeroDues: true,
          minActivityPoints: 80,
        },
      },
      smsGatewayConfigJson: {
        provider: "SSL_WIRELESS",
        senderId: "RSM-BD",
        apiKeyConfigured: false,
      },
    },
  });

  console.info(`✅ Seeded Organization: ${tenant.name} (${tenant.slug})`);

  // 2. Create Branch Hierarchy
  const centralNode = await prisma.branchNode.create({
    data: {
      organizationId: tenant.id,
      name: "National Executive Secretariat",
      nameBn: "কেন্দ্রীয় কার্যনির্বাহী সচিবালয়",
      code: "RSM-HQ",
      levelLabel: "National HQ",
      depth: 0,
      materializedPath: "1",
    },
  });

  const divisionNode = await prisma.branchNode.create({
    data: {
      organizationId: tenant.id,
      parentId: centralNode.id,
      name: "Dhaka Metropolitan Division Council",
      nameBn: "ঢাকা মহানগর বিভাগীয় কাউন্সিল",
      code: "RSM-DHK",
      levelLabel: "Division",
      depth: 1,
      materializedPath: `${centralNode.materializedPath}/1`,
    },
  });

  const branchUnit = await prisma.branchNode.create({
    data: {
      organizationId: tenant.id,
      parentId: divisionNode.id,
      name: "Dhaka University Central Campus Chapter",
      nameBn: "ঢাকা বিশ্ববিদ্যালয় কেন্দ্রীয় চ্যাপ্টার",
      code: "RSM-DU",
      levelLabel: "Campus Chapter",
      depth: 2,
      materializedPath: `${divisionNode.materializedPath}/1`,
    },
  });

  console.info(`✅ Seeded Branch Hierarchy: ${centralNode.name} -> ${divisionNode.name} -> ${branchUnit.name}`);

  // 3. Create Key Governance Positions
  const presidentPos = await prisma.position.create({
    data: {
      organizationId: tenant.id,
      title: "President & Movement Convener",
      titleBn: "সভাপতি ও আন্দোলন আহ্বায়ক",
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

  const researchPos = await prisma.position.create({
    data: {
      organizationId: tenant.id,
      title: "Director of Research & Blackspot Mapping",
      titleBn: "গবেষণা ও ব্ল্যাকস্পট ম্যাপিং পরিচালক",
      rankOrder: 3,
      isCentralRole: true,
      defaultPermissions: ["RESEARCH:ALL", "AUDIT:RUN", "DATA:PUBLISH"],
    },
  });

  // 4. Create Demo Admin / Executive User
  const demoLeader = await prisma.user.create({
    data: {
      organizationId: tenant.id,
      email: "convener@roadsafetymovement.org",
      phone: "+8801819778899",
      passwordHash: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyUIXe/0FgpT3N.rYqWwzLqfI4p2FkK.", // hashed demo password
      fullName: "Engr. Tanvir Ahmed",
      fullNameBn: "প্রকৌশলী তানভীর আহমেদ",
      bloodGroup: "O+",
      occupation: "Transport Systems Researcher & Safe Road Activist",
      bio: "Founding organizer from the 2018 Students' Safe Road Movement, championing zero traffic crash fatalities.",
    },
  });

  // Assign Central President Position
  await prisma.userPosition.create({
    data: {
      organizationId: tenant.id,
      userId: demoLeader.id,
      positionId: presidentPos.id,
      branchNodeId: centralNode.id,
      committeeTermName: "National Executive Council 2026-2028",
      termStartDate: new Date("2026-01-01"),
      isActive: true,
    },
  });

  // Create Executive Fellow Membership Record
  await prisma.membership.create({
    data: {
      organizationId: tenant.id,
      userId: demoLeader.id,
      tier: MembershipTier.LIFE,
      status: MemberStatus.ACTIVE,
      membershipNumber: "RSM-VOL-2018-001",
      securityHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    },
  });

  // 5. Seed Public Notices & Events
  await prisma.notice.create({
    data: {
      organizationId: tenant.id,
      title: "Press Release: Demand for Official Paradigm Shift from 'Accident' to 'Road Crash'",
      titleBn: "বিজ্ঞপ্তি: সড়ক নিরাপত্তা নিশ্চিতকরণে ‘দুর্ঘটনা’ নয়, ‘রোড ক্র্যাশ’ শব্দ ব্যবহারের আহ্বান",
      contentHtml: "<p>Road Safety Movement strongly calls upon the press, judiciary, and government agencies to reject the term 'accident' when referring to preventable collisions caused by recklessness or mechanical neglect.</p>",
      contentHtmlBn: "<p>সড়ক দুর্ঘটনামুক্ত করার লক্ষ্যে গণমাধ্যম ও নীতিমালায় 'দুর্ঘটনা' শব্দের পরিবর্তে দায়বদ্ধতামূলক 'রোড ক্র্যাশ' শব্দ ব্যবহারের জন্য জোরালো আহ্বান জানাচ্ছে নিরাপদ সড়ক আন্দোলন।</p>",
      isPublic: true,
      isPinned: true,
    },
  });

  await prisma.event.create({
    data: {
      organizationId: tenant.id,
      branchNodeId: centralNode.id,
      title: "8th National Safe Road Youth Summit & Blackspot Audit 2026",
      titleBn: "৮ম জাতীয় নিরাপদ সড়ক যুব সম্মেলন ও ব্ল্যাকস্পট অডিট ২০২৬",
      description: "Gathering of 9,010+ volunteers across 64 districts, presenting data-driven blackspot surveys and youth policy charters.",
      venue: "Bangabandhu International Conference Center (BICC), Dhaka",
      venueBn: "বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্র (বিআইসিসি), ঢাকা",
      startTime: new Date("2026-10-22T09:00:00Z"),
      endTime: new Date("2026-10-23T18:00:00Z"),
      ticketFeePaisa: BigInt(0), // Free voluntary event
      pointsAwarded: 50,
      isPublic: true,
    },
  });

  // 6. Seed Official Executive Governance Meeting & Numbered Resolution
  const executiveMeeting = await prisma.meeting.create({
    data: {
      organizationId: tenant.id,
      branchNodeId: centralNode.id,
      title: "1st Ordinary Session of National Executive Council (Term 2026-2028)",
      titleBn: "জাতীয় কার্যনির্বাহী পরিষদের ১ম সাধারণ সভা (মেয়াদ ২০২৬-২০২৮)",
      category: "CENTRAL_EXECUTIVE_COUNCIL",
      status: MeetingStatus.MINUTES_APPROVED,
      scheduledAt: new Date("2026-02-10T11:00:00Z"),
      venue: "National Secretariat Council Hall, Dhaka",
      venueBn: "জাতীয় সচিবালয় পরিষদ কক্ষ, ঢাকা",
      presidedById: demoLeader.id,
      recordedById: gsPos.id,
      quorumCount: 19,
      totalEligibleCount: 21,
      minutesHtml: "<p>The council convened under the leadership of Engr. Tanvir Ahmed. 64-District branch reports ratified.</p>",
      minutesHtmlBn: "<p>প্রকৌশলী তানভীর আহমেদের সভাপতিত্বে জাতীয় কার্যনির্বাহী সভা অনুষ্ঠিত হয়। ৬৪ জেলার শাখা প্রতিবেদন অনুমোদিত হয়।</p>",
      approvedAt: new Date("2026-02-12T14:00:00Z"),
      approvedById: demoLeader.id,
    },
  });

  await prisma.meetingResolution.create({
    data: {
      organizationId: tenant.id,
      meetingId: executiveMeeting.id,
      resolutionNumber: "RES-RSM-2026-001",
      agendaTitle: "Ratification of 420 Highway Blackspot Audit & Emergency Victim Fund",
      decisionText: "Unanimously resolved that 420 surveyed blackspots will receive civic barricades, and 25% of annual contributions are reserved for direct victim medical relief.",
      decisionTextBn: "সর্বসম্মতভাবে সিদ্ধান্ত গৃহীত হয় যে ৪২০টি ব্ল্যাকস্পটে নাগরিক ট্রাফিক সমাধান বাস্তবায়ন এবং বার্ষিক তহবিলের ২৫% সরাসরি ভিকটিমদের জরুরি চিকিৎসা অনুদানে সংরক্ষিত থাকবে।",
      isUnanimous: true,
      status: "ADOPTED",
    },
  });

  console.info("🎉 Road Safety Movement database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
