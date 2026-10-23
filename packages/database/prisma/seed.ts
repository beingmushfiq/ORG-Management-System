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

  // 1. Create Flagship Organization: National Agricultural Olympiad
  const agriTenant = await prisma.organization.upsert({
    where: { slug: "agriolympiad" },
    update: {
      name: "National Agricultural Olympiad",
      nameBn: "জাতীয় কৃষি অলিম্পিয়াড",
      customDomain: "agriculturalolympiad.com",
      tagline: "Empowering Youth to Shape a Sustainable Future for Bangladesh Agriculture",
      taglineBn: "টেকসই কৃষির রূপান্তরে তরুণ প্রজন্মের নেতৃত্ব ও উদ্ভাবন",
      primaryColorHsl: "142 76% 22%", // Forest Emerald Green (#0F5132)
      accentColorHsl: "38 92% 50%",   // Harvest Sun Gold (#F59E0B)
      contactEmail: "agriculturalolympiad@gmail.com",
      contactPhone: "+880 1717-395047",
      whatsappNumber: "+880 1717-395047",
      headOfficeAddress: "House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka, Bangladesh",
      headOfficeAddressBn: "বাড়ি ০৪, রোড ১২/বি, সেক্টর ১০, উত্তরা মডেল টাউন, ঢাকা, বাংলাদেশ",
      tradeLicenseNumber: "03247/2023-2025",
      defaultCurrency: "BDT",
      aboutStoryHtml: "<p>The National Agricultural Olympiad is Bangladesh's pioneering nationwide competition and youth empowerment movement, dedicated to transforming smart farming, climate resilience, and food systems through scientific education.</p>",
      aboutStoryHtmlBn: "<p>জাতীয় কৃষি অলিম্পিয়াড বাংলাদেশের সর্ববৃহৎ কৃষিভিত্তিক মেধা অন্বেষণ প্ল্যাটফর্ম—যা আধুনিক কৃষি প্রযুক্তি, জলবায়ু অভিযোজন এবং খাদ্য সুরক্ষায় শিক্ষার্থীদের সম্পৃক্ত করতে কাজ করে যাচ্ছে।</p>",
      termsHtml: "<p>Official Terms and Conditions for participation in National Agricultural Olympiad Season 2025.</p>",
      refundPolicyHtml: "<p>Refund applications accepted within 14 calendar days; refunds processed within 5-7 working days back to original channel.</p>",
      privacyPolicyHtml: "<p>Student data is strictly protected under institutional data privacy guidelines.</p>",
      deliveryPolicyHtml: "<p>Digital admit cards and e-certificates delivered within 24 hours; physical medals delivered within 3-7 business days.</p>",
    },
    create: {
      name: "National Agricultural Olympiad",
      nameBn: "জাতীয় কৃষি অলিম্পিয়াড",
      slug: "agriolympiad",
      customDomain: "agriculturalolympiad.com",
      tagline: "Empowering Youth to Shape a Sustainable Future for Bangladesh Agriculture",
      taglineBn: "টেকসই কৃষির রূপান্তরে তরুণ প্রজন্মের নেতৃত্ব ও উদ্ভাবন",
      primaryColorHsl: "142 76% 22%", // Forest Emerald Green
      accentColorHsl: "38 92% 50%",   // Harvest Sun Gold
      contactEmail: "agriculturalolympiad@gmail.com",
      contactPhone: "+880 1717-395047",
      whatsappNumber: "+880 1717-395047",
      headOfficeAddress: "House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka, Bangladesh",
      headOfficeAddressBn: "বাড়ি ০৪, রোড ১২/বি, সেক্টর ১০, উত্তরা মডেল টাউন, ঢাকা, বাংলাদেশ",
      tradeLicenseNumber: "03247/2023-2025",
      defaultCurrency: "BDT",
      aboutStoryHtml: "<p>The National Agricultural Olympiad is Bangladesh's pioneering nationwide competition and youth empowerment movement, dedicated to transforming smart farming, climate resilience, and food systems through scientific education.</p>",
      aboutStoryHtmlBn: "<p>জাতীয় কৃষি অলিম্পিয়াড বাংলাদেশের সর্ববৃহৎ কৃষিভিত্তিক মেধা অন্বেষণ প্ল্যাটফর্ম—যা আধুনিক কৃষি প্রযুক্তি, জলবায়ু অভিযোজন এবং খাদ্য সুরক্ষায় শিক্ষার্থীদের সম্পৃক্ত করতে কাজ করে যাচ্ছে।</p>",
      termsHtml: "<p>Official Terms and Conditions for participation in National Agricultural Olympiad Season 2025.</p>",
      refundPolicyHtml: "<p>Refund applications accepted within 14 calendar days; refunds processed within 5-7 working days back to original channel.</p>",
      privacyPolicyHtml: "<p>Student data is strictly protected under institutional data privacy guidelines.</p>",
      deliveryPolicyHtml: "<p>Digital admit cards and e-certificates delivered within 24 hours; physical medals delivered within 3-7 business days.</p>",
      smsGatewayConfigJson: {
        provider: "SSL_WIRELESS",
        senderId: "AGRI-OLYMP",
        apiKeyConfigured: false,
      },
    },
  });

  console.info(`✅ Seeded Organization: ${agriTenant.name} (${agriTenant.slug}) with Trade License: ${agriTenant.tradeLicenseNumber}`);

  // 2. Branch Chapters for Agricultural Olympiad
  const centralSecretariat = await prisma.branchNode.create({
    data: {
      organizationId: agriTenant.id,
      name: "National Organizing Secretariat (Uttara HQ)",
      nameBn: "জাতীয় সমন্বয় সচিবালয় (উত্তরা)",
      code: "AGRI-HQ",
      levelLabel: "National Secretariat",
      depth: 0,
      materializedPath: "1",
      address: "House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka",
      contactPhone: "+880 1717-395047",
    },
  });

  const bauChapter = await prisma.branchNode.create({
    data: {
      organizationId: agriTenant.id,
      parentId: centralSecretariat.id,
      name: "Bangladesh Agricultural University Chapter (BAU)",
      nameBn: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয় চ্যাপ্টার (বাকৃবি)",
      code: "AGRI-BAU",
      levelLabel: "University Division",
      depth: 1,
      materializedPath: `${centralSecretariat.materializedPath}/1`,
      address: "BAU Campus, Mymensingh-2202",
    },
  });

  const dhakaChapter = await prisma.branchNode.create({
    data: {
      organizationId: agriTenant.id,
      parentId: centralSecretariat.id,
      name: "Dhaka Regional Coordination Council",
      nameBn: "ঢাকা আঞ্চলিক সমন্বয় পরিষদ",
      code: "AGRI-DHK",
      levelLabel: "Division Chapter",
      depth: 1,
      materializedPath: `${centralSecretariat.materializedPath}/2`,
    },
  });

  console.info(`✅ Seeded Agricultural Olympiad Branches: ${centralSecretariat.name} -> ${bauChapter.name}, ${dhakaChapter.name}`);

  // 3. Seed Courses in BDT
  await prisma.course.createMany({
    data: [
      {
        organizationId: agriTenant.id,
        title: "Foundations of Smart Agriculture & Hydroponics",
        titleBn: "স্মার্ট কৃষি ও হাইড্রোপনিক্স পরিচিতি",
        slug: "smart-agriculture-hydroponics",
        description: "Hands-on guide to soilless farming, nutrient solutions, and urban agriculture for junior students.",
        pricePaisa: BigInt(15000), // BDT 150.00
        category: "Junior Class (Grades 6-8)",
        durationHours: 12,
        lessonsCount: 10,
        isPublished: true,
      },
      {
        organizationId: agriTenant.id,
        title: "Climate-Resilient Crop Management & Soil Health",
        titleBn: "জলবায়ু সহনশীল শস্য ব্যবস্থাপনা ও মৃত্তিকা স্বাস্থ্য",
        slug: "climate-resilient-crops",
        description: "Techniques for managing saline, drought, and flood-prone agricultural ecosystems.",
        pricePaisa: BigInt(25000), // BDT 250.00
        category: "Secondary Class (Grades 9-10)",
        durationHours: 18,
        lessonsCount: 15,
        isPublished: true,
      },
      {
        organizationId: agriTenant.id,
        title: "Agricultural Biotechnology & Genetic Improvement",
        titleBn: "কৃষি বায়োটেকনোলজি ও জেনেটিক উন্নয়ন",
        slug: "agricultural-biotechnology",
        description: "Plant tissue culture, molecular markers, and modern genetic tools in crop science.",
        pricePaisa: BigInt(35000), // BDT 350.00
        category: "Higher Secondary (Grades 11-12)",
        durationHours: 24,
        lessonsCount: 20,
        isPublished: true,
      },
    ],
  });

  console.info("✅ Seeded Courses in BDT.");

  // 4. Seed Notice & Events for Season 2025
  await prisma.notice.create({
    data: {
      organizationId: agriTenant.id,
      title: "Announcement: National Agricultural Olympiad 2025 Season 2 Registration Open",
      titleBn: "জরুরি বিজ্ঞপ্তি: জাতীয় কৃষি অলিম্পিয়াড ২০২৫ সিজন ২ নিবন্ধন শুরু",
      contentHtml: "<p>Registration is officially live for Junior, Secondary, and Higher Secondary students across all 64 districts. Early bird fee is BDT 70.00 payable via SSLCommerz.</p>",
      contentHtmlBn: "<p>দেশব্যাপী ৬৪টি জেলার স্কুল ও কলেজ শিক্ষার্থীদের জন্য জাতীয় কৃষি অলিম্পিয়াড ২০২৫-এর নিবন্ধন শুরু হয়েছে। নিবন্ধন ফি ৭০.০০ টাকা (SSLCommerz-এর মাধ্যমে প্রদেয়)।</p>",
      isPublic: true,
      isPinned: true,
    },
  });

  await prisma.event.create({
    data: {
      organizationId: agriTenant.id,
      branchNodeId: centralSecretariat.id,
      title: "National Agricultural Olympiad 2025 — Grand Finale & Award Gala",
      titleBn: "জাতীয় কৃষি অলিম্পিয়াড ২০২৫ — গ্র্যান্ড ফিনালে ও পুরস্কার বিতরণী",
      description: "Final rounds, agricultural research tour, laptop awards, and ceremonial recognition for top national performers.",
      venue: "Bangladesh Agricultural University (BAU) Auditorium, Mymensingh",
      venueBn: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয় অডিটোরিয়াম, ময়মনসিংহ",
      startTime: new Date("2026-11-20T09:00:00Z"),
      endTime: new Date("2026-11-21T18:00:00Z"),
      ticketFeePaisa: BigInt(7000), // BDT 70.00
      pointsAwarded: 100,
      isPublic: true,
    },
  });

  console.info("🎉 Agricultural Olympiad database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
