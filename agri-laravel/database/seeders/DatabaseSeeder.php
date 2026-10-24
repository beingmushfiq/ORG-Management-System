<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\MemberHierarchy;
use App\Models\OrgConfig;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@agriolympiad.org'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Also add admin@roadsafetymovement.org for seamless access
        User::updateOrCreate(
            ['email' => 'admin@roadsafetymovement.org'],
            [
                'name' => 'RSM Secretariat Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // 2. OrgConfig Singleton — Road Safety Movement (নিরাপদ সড়ক আন্দোলন)
        OrgConfig::updateOrCreate(['id' => 1], [
            'org_name'            => 'Road Safety Movement (RSM)',
            'org_name_bn'         => 'নিরাপদ সড়ক আন্দোলন (বাংলাদেশ)',
            'slug'                => 'roadsafetymovement',
            'custom_domain'       => 'roadsafetymovement.org',
            'logo_url'            => '/images/rsm-logo.png',
            'tagline'             => 'Demanding Safe Roads, Strict Traffic Discipline & Zero Crash Casualties Across Bangladesh',
            'tagline_bn'          => 'নিরাপদ সড়কের দাবিতে ৬৪ জেলায় ছাত্র-জনতার ঐক্যবদ্ধ নাগরিক আন্দোলন',
            'motto'               => 'Safe Roads for Every Citizen · একটি দুর্ঘটনা সারা জীবনের কান্না',
            'motto_bn'            => 'নাগরিক অধিকার · পথচারী সুরক্ষা · সুশৃঙ্খল ট্রাফিক ব্যবস্থা',
            'primary_color_hsl'   => '222 47% 11%', // Deep Road Asphalt Navy (#0F172A)
            'accent_color_hsl'    => '38 92% 50%',  // Traffic Caution Amber (#F59E0B)
            'contact_email'       => 'roadsafetymovement.bd@gmail.com',
            'contact_phone'       => '+880 1717-395047',
            'whatsapp_number'     => '+880 1717-395047',
            'head_office_address' => 'House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka, Bangladesh',
            'head_office_address_bn' => 'বাড়ি ০৪, রোড ১২/বি, সেক্টর ১০, উত্তরা মডেল টাউন, ঢাকা, বাংলাদেশ',
            'trade_license_number' => '03247/2023-2025',
            'tin_number'          => '849204829104',
            'default_currency'    => 'BDT',
            'terms_html'          => '<h3>1. Movement Constitution & Volunteer Integrity</h3><p>Participation in the Road Safety Movement (নিরাপদ সড়ক আন্দোলন) is an honorable civic commitment. All volunteers and members pledge to uphold peaceful advocacy, assist pedestrians, respect law enforcement personnel, and abide strictly by the Road Transport Act 2018.</p><h3>2. Code of Conduct on the Streets</h3><p>Members conducting roadside traffic awareness campaigns must wear official high-visibility reflective vests and carry verified digital member credentials. Violent agitation, unlawful obstruction of emergency vehicles, or partisan political propaganda is strictly grounds for immediate expulsion.</p><h3>3. Governance & National Assembly</h3><p>The National Organizing Secretariat and Central Executive Council preside over policy, district chapter coordination, and annual state-of-road-safety reporting.</p>',
            'terms_html_bn'       => '<h3>১. আন্দোলনের সংবিধান ও অঙ্গীকার</h3><p>নিরাপদ সড়ক আন্দোলনের প্রতিটি সদস্য সুশৃঙ্খল ট্রাফিক আইন মেনে চলা, পথচারীদের অধিকার রক্ষা এবং অহিংস নাগরিক আন্দোলনের নীতিতে প্রতিশ্রুতিবদ্ধ।</p><h3>২. ফিল্ড পর্যায়ের আচরণবিধি</h3><p>মাঠপর্যায়ে সচেতনতামূলক কার্যক্রমে নিয়োজিত সকল সদস্যের জন্য অফিসিয়াল রিফ্লেক্টিভ ভেস্ট এবং ডিজিটাল পরিচয়পত্র প্রদর্শন বাধ্যতামূলক।</p>',
            'refund_policy_html'  => '<h3>1. Membership Fees & Academy Training Refunds</h3><p>Members, volunteer cadets, and trainees enrolled in Defensive Driving or Crash Response courses may request a 100% refund of fees within 14 calendar days of payment if requested prior to kit dispatch or course examination access.</p><h3>2. Automated Reversal Window</h3><p>All approved refunds are processed back directly to the applicant’s originating financial channel (bKash, Nagad, Rocket, or Visa/MasterCard via the SSLCommerz payment gateway) within 5 to 7 business banking days.</p><h3>3. Volunteer Safety Kits</h3><p>If physical high-vis gear or first-responder pouches have already been dispatched via courier, courier logistics charges will be deducted from the refund amount.</p>',
            'refund_policy_html_bn' => '<h3>১. রিফান্ড নীতিমালা</h3><p>প্রশিক্ষণ বা সদস্যপদ প্রত্যাহারের ক্ষেত্রে ১৪ দিনের মধ্যে আবেদন করলে ৫-৭ কার্যদিবসের মধ্যে মূল গেটওয়ের মাধ্যমে সম্পূর্ণ ফি ফেরত দেওয়া হবে।</p>',
            'privacy_policy_html' => '<h3>1. Safeguarding Citizen & Volunteer Data</h3><p>We respect the confidentiality of all members, student cadets, blood donors, and accident informants. In full adherence to the Digital Security Act of Bangladesh, personal phone numbers, NID information, and residential addresses are safeguarded with strict 3-tier privacy controls.</p><h3>2. Emergency Blood Donor Directory</h3><p>Volunteers opting into the Highway Crash Blood Network will only have their blood group and contact number made visible during verified accident emergency broadcasts.</p><h3>3. Payment Card Data Security</h3><p>All financial transactions are tokenized via PCI-DSS certified SSLCommerz infrastructure. We never store credit card or debit card numbers on our servers.</p>',
            'privacy_policy_html_bn' => '<h3>১. তথ্য সুরক্ষা ও গোপনীয়তা</h3><p>সদস্য ও স্বেচ্ছাসেবকদের ব্যক্তিগত তথ্য সর্বোচ্চ নিরাপত্তার সাথে সংরক্ষিত থাকে এবং বাণিজ্যিক উদ্দেশ্যে কোনো তৃতীয় পক্ষের কাছে হস্তান্তর করা হয় না।</p>',
            'delivery_policy_html' => '<h3>1. Instant Digital Member Passes & E-Certificates</h3><p>Upon verified payment of membership or training registration, digital QR-coded Member Passes and admit credentials are electronically generated within 15 minutes and available for instant PDF download.</p><h3>2. Physical High-Visibility Vests & First-Responder Kits</h3><p>Physical merchandise—including certified fluorescent reflective jackets, movement enamel pins, and trauma response packs—are dispatched via registered domestic couriers (Sundarban / Steadfast) within 3 to 7 business days with SMS tracking.</p>',
            'delivery_policy_html_bn' => '<h3>১. ডিজিটাল ও ফিজিক্যাল ডেলিভারি</h3><p>অনলাইন নিবন্ধনের সাথে সাথেই ডিজিটাল মেম্বারশিপ পাস ও কিউআর কোড পাওয়া যাবে। ফিজিক্যাল রিফ্লেক্টিভ ভেস্ট ও কিট ৩-৭ কার্যদিবসের মধ্যে কুরিয়ারে সরবরাহ করা হয়।</p>',
            'about_story_html'    => '<p class="lead">The Road Safety Movement (নিরাপদ সড়ক আন্দোলন — RSM) is Bangladesh’s premier non-partisan citizen advocacy alliance dedicated to ending preventable traffic carnage and securing dignified, safe mobility for every child, student, and citizen.</p><p>Born out of the historic student-led street movement that inspired the world, our mission is to transform grief into institutional reform. Across all 64 districts, our volunteer cadets work alongside traffic authorities to conduct school crossing patrols, identify dangerous accident blackspots, train professional drivers, and demand accountability under the Road Transport Act 2018.</p><p>With over 75,000 registered volunteers and active coordination councils in every administrative division, the Road Safety Movement stands as the unified voice of Bangladesh’s pedestrians and commuters.</p>',
            'about_story_html_bn' => '<p class="lead">নিরাপদ সড়ক আন্দোলন (RSM) বাংলাদেশের সড়ককে ঘাতকমুক্ত এবং সুশৃঙ্খল করার লক্ষ্যে ছাত্র-জনতার গড়ে তোলা একটি ঐতিহাসিক নাগরিক প্ল্যাটফর্ম।</p><p>২০১৮ সালের ঐতিহাসিক সড়ক আন্দোলনের চেতনাকে ধারণ করে দেশের ৬৪টি জেলায় আমাদের স্বেচ্ছাসেবকরা সড়ক সচেতনতা বৃদ্ধি, ব্ল্যাকস্পট দূরীকরণ এবং দুর্ঘটনায় আহতদের জরুরি সহায়তায় সার্বক্ষণিক কাজ করে যাচ্ছে।</p>',
            'nav_links'           => [
                ['label' => 'Home',              'label_bn' => 'মূলপাতা',           'href' => '/'],
                ['label' => 'About Movement',    'label_bn' => 'আন্দোলনের কথা',     'href' => '/about'],
                ['label' => 'Member Hierarchy',  'label_bn' => 'নেতৃত্ব ও পরিষদ',    'href' => '/hierarchy'],
                ['label' => 'Training Academy',  'label_bn' => 'ড্রাইভিং একাডেমি',   'href' => '/courses'],
                ['label' => 'Campaigns',         'label_bn' => 'অভিযান ও ইভেন্ট',   'href' => '/events'],
                ['label' => 'Media & Blackspots','label_bn' => 'গ্যালারি ও স্পট',   'href' => '/gallery'],
                ['label' => 'Gazette & Circular','label_bn' => 'গেজেট ও নোটিশ',     'href' => '/notices'],
                ['label' => 'Join Movement',     'label_bn' => 'যুক্ত হোন',         'href' => '/apply'],
            ],
            'footer_columns'      => [
                ['heading' => 'Movement Wings', 'links' => [
                    ['label' => 'National Organizing Secretariat', 'href' => '/hierarchy'],
                    ['label' => 'Highway Blackspot Elimination',   'href' => '/events'],
                    ['label' => 'Defensive Driving Academy',       'href' => '/courses'],
                    ['label' => 'Emergency Crash Blood Corps',     'href' => '/apply'],
                ]],
                ['heading' => 'Civic Engagement', 'links' => [
                    ['label' => 'Movement Founding Narrative',     'href' => '/about'],
                    ['label' => 'Leadership Hierarchy Organogram', 'href' => '/hierarchy'],
                    ['label' => 'Accident Archive & Memorial',     'href' => '/gallery'],
                    ['label' => 'Official Circulars & Press',      'href' => '/notices'],
                ]],
                ['heading' => 'Legal & Compliance', 'links' => [
                    ['label' => 'Terms & Volunteer Conduct',       'href' => '/terms-condition'],
                    ['label' => 'Return & Refund Policy',          'href' => '/refund-policy'],
                    ['label' => 'Privacy Policy & Data Security',  'href' => '/privacy-policy'],
                    ['label' => 'Kit & Certificate Delivery',      'href' => '/delivery-policy'],
                ]],
            ],
        ]);

        // 3. Member Categories / Tracks (BDT Pricing)
        $categories = [
            [
                'name' => 'Volunteer Cadet Corps',
                'name_bn' => 'স্বেচ্ছাসেবক ক্যাডেট কোর',
                'grade_range' => 'Student & Youth',
                'description' => 'For school, college, and university students leading street zebra-crossing safety patrols, student rallies, and traffic education.',
                'description_bn' => 'স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের তরুণ শিক্ষার্থীদের জন্য ট্রাফিক সচেতনতা ও শৃঙ্খলা রক্ষার সম্মুখ সারির স্বেচ্ছাসেবক প্ল্যাটফর্ম।',
                'fee_paisa' => 7000, // ৳ 70 BDT
                'capacity' => 50000,
                'sort_order' => 1,
            ],
            [
                'name' => 'General Member',
                'name_bn' => 'সাধারণ সদস্য',
                'grade_range' => 'Active Citizens',
                'description' => 'Open to all citizens demanding safe transit. Includes voting rights in district councils, advocacy townhalls, and legal workshops.',
                'description_bn' => 'সকল সচেতন নাগরিকের জন্য উন্মুক্ত। জেলা পরিষদ ও নাগরিক শুনানিতে অংশগ্রহণ এবং আইনি সচেতনতা কর্মসূচির অধিকার।',
                'fee_paisa' => 10000, // ৳ 100 BDT
                'capacity' => 25000,
                'sort_order' => 2,
            ],
            [
                'name' => 'Certified Crash Responder & First-Aid Fellow',
                'name_bn' => 'ফার্স্ট-এইড ও জরুরি রেসপন্ডার ফেলো',
                'grade_range' => 'Emergency Corps',
                'description' => 'Trained in highway trauma first aid, emergency patient evacuation, roadside triage, and emergency blood dispatch.',
                'description_bn' => 'মহাসড়কে সড়ক দুর্ঘটনায় তাৎক্ষণিক উদ্ধার ও প্রাথমিক চিকিৎসা প্রদানে বিশেষ প্রশিক্ষণপ্রাপ্ত জরুরি উদ্ধারকর্মী।',
                'fee_paisa' => 25000, // ৳ 250 BDT
                'capacity' => 10000,
                'sort_order' => 3,
            ],
            [
                'name' => 'Campus Chapter Ambassador',
                'name_bn' => 'ক্যাম্পাস চ্যাপ্টার অ্যাম্বাসেডর',
                'grade_range' => 'University Leaders',
                'description' => 'University student leaders coordinating institutional road safety cells across DU, BUET, BAU, RU, CU, and 150+ colleges.',
                'description_bn' => 'বিশ্ববিদ্যালয় ও কলেজ পর্যায়ে নিরাপদ সড়ক আন্দোলনের চ্যাপ্টার নেতৃত্ব ও সচেতনতামূলক কর্মসূচি সমন্বয়কারী।',
                'fee_paisa' => 7000, // ৳ 70 BDT
                'capacity' => 5000,
                'sort_order' => 4,
            ],
            [
                'name' => 'Life Member & Civic Patron',
                'name_bn' => 'আজীবন সদস্য ও পৃষ্ঠপোষক',
                'grade_range' => 'Senior Patrons',
                'description' => 'Permanent voting seat in national conventions, sponsoring blackspot elimination projects, and supporting victim legal defense.',
                'description_bn' => 'জাতীয় কাউন্সিলে স্থায়ী প্রতিনিধিত্ব এবং সড়ক দুর্ঘটনায় ক্ষতিগ্রস্তদের আইনি সহায়তা তহবিলের আজীবন পৃষ্ঠপোষক।',
                'fee_paisa' => 100000, // ৳ 1000 BDT
                'capacity' => 2500,
                'sort_order' => 5,
            ],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['name' => $cat['name']], $cat);
        }

        // 4. Road Safety Training Courses
        $courses = [
            [
                'title' => 'Defensive Driving & Highway Hazard Avoidance',
                'title_bn' => 'ডিফেন্সিভ ড্রাইভিং ও মহাসড়ক নিরাপত্তা কোর্স',
                'description' => 'Master blind-spot management, braking distances, bad weather maneuvers, and vehicle safety inspections to prevent collisions.',
                'description_bn' => 'মহাসড়কে অন্ধবিন্দু নিয়ন্ত্রণ, প্রতিকূল আবহাওয়ায় নিরাপদ গতি ও ব্রেকিং দূরত্বের আধুনিক বৈজ্ঞানিক প্রশিক্ষণ।',
                'fee_paisa' => 35000, // ৳ 350 BDT
                'lesson_count' => 12,
                'duration_hours' => 24,
                'instructor' => 'Engr. Kazi Mahfuzur Rahman (Traffic Engineer)',
                'sort_order' => 1,
            ],
            [
                'title' => 'Highway Crash Scene First-Aid & Trauma Care',
                'title_bn' => 'সড়ক দুর্ঘটনা ও জরুরি ট্রমা ফার্স্ট-এইড প্রশিক্ষণ',
                'description' => 'Certified emergency life-support protocols: hemorrhagic shock prevention, spinal immobilization, and roadside stabilization.',
                'description_bn' => 'রক্তক্ষরণ নিয়ন্ত্রণ, স্পাইনাল কর্ড সুরক্ষা এবং অ্যাম্বুলেন্স আসার পূর্বে গোল্ডেন আওয়ারে জীবনরক্ষাকারী প্রাথমিক চিকিৎসা।',
                'fee_paisa' => 25000, // ৳ 250 BDT
                'lesson_count' => 10,
                'duration_hours' => 20,
                'instructor' => 'Dr. Nusrat Jahan (Trauma & Emergency Specialist)',
                'sort_order' => 2,
            ],
            [
                'title' => 'Road Transport Act 2018 & Citizens Legal Rights',
                'title_bn' => 'সড়ক পরিবহন আইন ২০১৮ ও নাগরিক অধিকার আইনি কর্মশালা',
                'description' => 'Understanding pedestrian crossing rules, driver licensing regulations, compensation claims for victims, and filing FIRs.',
                'description_bn' => 'পথচারীর আইনি অধিকার, চালকের দায়বদ্ধতা, দুর্ঘটনা পরবর্তী ক্ষতিপূরণ দাবি ও আইনি সহায়তার উপায়।',
                'fee_paisa' => 20000, // ৳ 200 BDT
                'lesson_count' => 8,
                'duration_hours' => 16,
                'instructor' => 'Adv. Fahmida Sultana (Supreme Court of Bangladesh)',
                'sort_order' => 3,
            ],
            [
                'title' => 'Accident Blackspot Auditing & Digital Geographic Mapping',
                'title_bn' => 'ব্ল্যাকস্পট চিহ্নিতকরণ ও ডিজিটাল জিআইএস ম্যাপিং',
                'description' => 'How citizen auditors use smartphone GPS and telemetry to log dangerous highway intersections and petition municipal authorities.',
                'description_bn' => 'মহাসড়কের ঝুঁকিপূর্ণ মোড় ও বিপজ্জনক ব্ল্যাকস্পট জিপিএস ম্যাপিং এবং প্রতিকার চেয়ে প্রকৌশল রিপোর্ট তৈরি।',
                'fee_paisa' => 50000, // ৳ 500 BDT
                'lesson_count' => 16,
                'duration_hours' => 32,
                'instructor' => 'Engr. Shamim Al Mamun (Highway Safety Researcher)',
                'sort_order' => 4,
            ],
        ];

        foreach ($courses as $c) {
            Course::updateOrCreate(['title' => $c['title']], $c);
        }

        // 5. Member Hierarchy & Standing Committees
        $hierarchy = [
            [
                'rank' => 1,
                'name_en' => 'National Organizing Secretariat (Central HQ)',
                'name_bn' => 'জাতীয় সমন্বয় সচিবালয় (কেন্দ্রীয় কার্যালয়)',
                'convener_name' => 'Prof. Dr. A. K. Azad',
                'convener_title' => 'Chief National Convener & Transport Safety Specialist',
                'convener_title_bn' => 'প্রধান সমন্বয়ক ও সড়ক পরিবহন গবেষক',
                'member_count' => 21,
                'mandate' => 'Apex national governing council overseeing all 64 district chapters, national policy submissions to BRTA, and legislative coordination.',
                'mandate_bn' => 'সমগ্র দেশের ৬৪টি জেলা চ্যাপ্টার পরিচালনা, বিআরটিএ-র সাথে নীতি সংস্কার এবং জাতীয় কাউন্সিলের সার্বিক নীতিনির্ধারণী পরিষদ।',
                'level' => 'Apex Directorate',
                'icon_key' => 'shield',
                'accent_gradient' => 'from-amber-500 to-yellow-600',
                'contact_email' => 'roadsafetymovement.bd@gmail.com',
            ],
            [
                'rank' => 2,
                'name_en' => 'Legal Advocacy & Road Transport Act Compliance Wing',
                'name_bn' => 'আইন সহায়তা ও সড়ক পরিবহন আইন কমপ্লায়েন্স সেল',
                'convener_name' => 'Adv. Fahmida Sultana',
                'convener_title' => 'Senior Counsel & Legal Defense Lead',
                'convener_title_bn' => 'সুপ্রিম কোর্টের আইনজীবী ও আইনি সহায়তা প্রধান',
                'member_count' => 16,
                'mandate' => 'Filing public interest litigation (PIL), providing free legal defense to accident victim families, and prosecuting unlicensed vehicle syndicates.',
                'mandate_bn' => 'দুর্ঘটনায় হতাহতদের ক্ষতিপূরণ আদায়, জনস্বার্থে রিট পিটিশন এবং ট্রাফিক আইনের সঠিক বাস্তবায়নে আইনি সহায়তা প্রদান।',
                'level' => 'Standing Committee',
                'icon_key' => 'scale',
                'accent_gradient' => 'from-blue-600 to-indigo-700',
                'contact_email' => 'legal@roadsafetymovement.org',
            ],
            [
                'rank' => 3,
                'name_en' => 'National Highway Blackspot Elimination Taskforce',
                'name_bn' => 'মহাসড়ক ব্ল্যাকস্পট প্রতিকার ও প্রকৌশল টাস্কফোর্স',
                'convener_name' => 'Engr. Shamim Al Mamun',
                'convener_title' => 'Highway Safety Auditor & Infrastructure Lead',
                'convener_title_bn' => 'সড়ক নিরাপত্তা প্রকৌশলী ও অডিট সমন্বয়ক',
                'member_count' => 18,
                'mandate' => 'Surveying dangerous curves across Dhaka-Aricha, Dhaka-Chattogram, and North Bengal corridors to install crash barriers and warning signage.',
                'mandate_bn' => 'দেশের প্রধান মহাসড়কসমূহের দুর্ঘটনাপ্রবণ ৪২০টি ব্ল্যাকস্পট সরেজমিন নিরীক্ষা এবং সড়ক ও জনপথ বিভাগকে প্রতিকারের সুপারিশ।',
                'level' => 'Technical Wing',
                'icon_key' => 'alert',
                'accent_gradient' => 'from-rose-600 to-red-700',
                'contact_email' => 'blackspots@roadsafetymovement.org',
            ],
            [
                'rank' => 4,
                'name_en' => 'Emergency Highway Crash & Blood Donor Network',
                'name_bn' => 'জরুরি দুর্ঘটনা উদ্ধার ও ব্লাড ডোনার নেটওয়ার্ক',
                'convener_name' => 'Dr. Nusrat Jahan',
                'convener_title' => 'Emergency Medicine & Paramedic Director',
                'convener_title_bn' => 'জরুরি চিকিৎসা পরিচালক ও ট্রমা বিশেষজ্ঞ',
                'member_count' => 35,
                'mandate' => 'Managing 24/7 hotline for highway crash victims, emergency blood group matching, ambulance logistics, and hospital bed triage.',
                'mandate_bn' => 'মহাসড়কে দুর্ঘটনায় আহতদের তাৎক্ষণিক রক্তদান, অ্যাম্বুলেন্স সহায়তা এবং হাসপাতালে ভর্তিতে ২৪ ঘণ্টার জরুরি সহায়তা সেল।',
                'level' => 'Humanitarian Wing',
                'icon_key' => 'heart',
                'accent_gradient' => 'from-emerald-600 to-teal-700',
                'contact_email' => 'blood@roadsafetymovement.org',
            ],
            [
                'rank' => 5,
                'name_en' => 'Divisional Coordination Councils (8 Divisions)',
                'name_bn' => '৮ বিভাগীয় সমন্বয় পরিষদ (ঢাকা, চট্টগ্রাম, রাজশাহী...)',
                'convener_name' => 'Dr. Kazi Mostafa Kamal',
                'convener_title' => 'Director of Regional Governance',
                'convener_title_bn' => 'আঞ্চলিক কার্যক্রম ও সমন্বয় পরিচালক',
                'member_count' => 32,
                'mandate' => 'Supervising 64-district local branches, conducting divisional student assemblies, and coordinating with divisional police commissioners.',
                'mandate_bn' => 'আটটি প্রশাসনিক বিভাগে জেলা ও উপজেলা কমিটিসমূহের সমন্বয় সাধন এবং স্থানীয় প্রশাসনের সাথে সুশৃঙ্খল ট্রাফিক ক্যাম্পেইন পরিচালনা।',
                'level' => 'Regional Council',
                'icon_key' => 'building',
                'accent_gradient' => 'from-purple-600 to-violet-700',
                'contact_email' => 'regional@roadsafetymovement.org',
            ],
            [
                'rank' => 6,
                'name_en' => 'Youth & Campus Chapter Ambassadors Directorate',
                'name_bn' => 'বিশ্ববিদ্যালয় ও ক্যাম্পাস অ্যাম্বাসেডর পর্ষদ',
                'convener_name' => 'Shariful Islam',
                'convener_title' => 'National Student Mobilization Lead',
                'convener_title_bn' => 'জাতীয় ছাত্র ও যুব সমন্বয়ক',
                'member_count' => 45,
                'mandate' => 'Empowering 50,000+ collegiate and university youth leaders to supervise school gate pedestrian crossings and promote defensive walking.',
                'mandate_bn' => 'সকল বিশ্ববিদ্যালয় ও কলেজে শিক্ষার্থী চ্যাপ্টার গঠন এবং স্কুল গেটে ট্রাফিক শৃঙ্খলা বজায় রাখতে ছাত্র স্বেচ্ছাসেবক দল পরিচালনা।',
                'level' => 'Student Wing',
                'icon_key' => 'graduation',
                'accent_gradient' => 'from-amber-600 to-orange-700',
                'contact_email' => 'campus@roadsafetymovement.org',
            ],
            [
                'rank' => 7,
                'name_en' => 'Media, Press & Public Awareness Bureau',
                'name_bn' => 'গণমাধ্যম, প্রচার ও জনসচেতনতা ব্যুরো',
                'convener_name' => 'Farhana Akter',
                'convener_title' => 'Director of Communications & Public Affairs',
                'convener_title_bn' => 'যোগাযোগ ও গণসংযোগ পরিচালক',
                'member_count' => 14,
                'mandate' => 'Publishing monthly national crash statistics, investigative road safety documentaries, and engaging national press clubs.',
                'mandate_bn' => 'মাসিক সড়ক দুর্ঘটনা রিপোর্ট প্রকাশ, সচেতনতামূলক ভিডিও ও সামাজিক যোগাযোগমাধ্যমে জাতীয় ক্যাম্পেইন পরিচালনা।',
                'level' => 'Communications Wing',
                'icon_key' => 'megaphone',
                'accent_gradient' => 'from-cyan-600 to-blue-700',
                'contact_email' => 'press@roadsafetymovement.org',
            ],
            [
                'rank' => 8,
                'name_en' => 'Statutory Treasury & Audit Council',
                'name_bn' => 'সংবিধিবদ্ধ ট্রেজারি ও হিসাব নিরীক্ষা পর্ষদ',
                'convener_name' => 'Mohammad Tanvir Hasan',
                'convener_title' => 'Treasurer & Statutory Financial Comptroller',
                'convener_title_bn' => 'অর্থ সম্পাদক ও কমপ্লায়েন্স নিয়ন্ত্রক',
                'member_count' => 10,
                'mandate' => 'Maintaining Trade License 03247/2023-2025 compliance, audit registers, SSLCommerz financial reconciliation, and BDT disbursements.',
                'mandate_bn' => 'ট্রেড লাইসেন্স ০৩২৪৭/২০২৩-২০২৫ কমপ্লায়েন্স রক্ষা, অডিট হিসাব, গেটওয়ে সেটেলমেন্ট এবং বিডিটি আর্থিক স্বচ্ছতা নিশ্চিতকরণ।',
                'level' => 'Oversight Directorate',
                'icon_key' => 'book',
                'accent_gradient' => 'from-slate-700 to-slate-900',
                'contact_email' => 'treasury@roadsafetymovement.org',
            ],
        ];

        foreach ($hierarchy as $h) {
            MemberHierarchy::updateOrCreate(['name_en' => $h['name_en']], $h);
        }
    }
}
