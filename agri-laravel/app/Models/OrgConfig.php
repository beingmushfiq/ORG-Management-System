<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgConfig extends Model
{
    protected $table = 'org_config';

    protected $fillable = [
        'org_name', 'org_name_bn', 'slug', 'custom_domain', 'logo_url',
        'tagline', 'tagline_bn', 'motto', 'motto_bn',
        'hero_headline', 'hero_headline_bn',
        'hero_subtitle', 'hero_subtitle_bn',
        'primary_color_hsl', 'accent_color_hsl',
        'contact_email', 'contact_phone', 'whatsapp_number',
        'head_office_address', 'head_office_address_bn',
        'trade_license_number', 'tin_number', 'default_currency',
        'terms_html', 'terms_html_bn',
        'refund_policy_html', 'refund_policy_html_bn',
        'privacy_policy_html', 'privacy_policy_html_bn',
        'delivery_policy_html', 'delivery_policy_html_bn',
        'about_story_html', 'about_story_html_bn',
        'nav_links', 'footer_columns',
        'pillars', 'stats', 'partners', 'faqs', 'social_links', 'section_visibility',
    ];

    protected $casts = [
        'nav_links'          => 'array',
        'footer_columns'     => 'array',
        'pillars'            => 'array',
        'stats'              => 'array',
        'partners'           => 'array',
        'faqs'               => 'array',
        'social_links'       => 'array',
        'section_visibility' => 'array',
    ];

    /**
     * Always return the single config row (singleton pattern).
     */
    public static function current(): static
    {
        return static::firstOrCreate([], [
            'org_name'            => 'Road Safety Movement (RSM)',
            'org_name_bn'         => 'নিরাপদ সড়ক আন্দোলন (রিসাআ)',
            'slug'                => 'roadsafetybd',
            'tagline'             => 'Citizens Alliance for Vision Zero, Highway Safety & Crash Casualties Prevention Across Bangladesh',
            'tagline_bn'          => 'সড়ক দুর্ঘটনা নয়, প্রতিরোধযোগ্য রোড ক্র্যাশ নির্মূলে জাতীয় নাগরিক ঐক্য',
            'motto'               => 'Life Over Speed · Safety Over Silence',
            'motto_bn'            => 'গতির চেয়ে জীবন মূল্যবান · নীরবতা ভেঙে রাজপথে নিরাপত্তা চাই',
            'hero_headline'       => 'Citizens Movement for Vision Zero & Accident-Free Highways in Bangladesh',
            'hero_headline_bn'    => 'ভিশন জিরো অর্জনে বাংলাদেশের ৬৪ জেলায় নাগরিক গণআন্দোলন',
            'hero_subtitle'       => 'Empowering 50,000+ youth, students, and citizens to eliminate road crashes, audit national blackspots, and establish strict transport governance.',
            'hero_subtitle_bn'    => '৫০,০০০+ শিক্ষার্থী, নাগরিক ও ফার্স্ট রেসপন্ডারদের সংগঠিত করে রোড ক্র্যাশ রোধ ও হাইওয়ে নিরাপত্তা বাস্তবায়নে অটল প্রয়াস।',
            'primary_color_hsl'   => '222 47% 11%',
            'accent_color_hsl'    => '38 92% 50%',
            'contact_email'       => 'contact@roadsafetymovement.org.bd',
            'contact_phone'       => '+880 1717-395047',
            'whatsapp_number'     => '+880 1717-395047',
            'head_office_address' => 'Central Command Secretariat, House 04, Road 12/B, Sector 10, Uttara, Dhaka-1230, Bangladesh',
            'head_office_address_bn' => 'কেন্দ্রীয় কমান্ড সচিবালয়, বাড়ি ০৪, রোড ১২/বি, সেক্টর ১০, উত্তরা, ঢাকা-১২৩০, বাংলাদেশ',
            'trade_license_number' => 'TRAD/DNCC/03247/2023',
            'tin_number'          => '8492-4912-3901-RSM',
            'default_currency'    => 'BDT',
            'terms_html'          => '<p>Official membership, volunteering, and operational bylaws of the Road Safety Movement (RSM) Bangladesh.</p>',
            'refund_policy_html'  => '<p>Membership application contributions support roadside crash rescue kits and advocacy. Voluntary dues are refundable within 7 days upon formal request to the Central Secretariat.</p>',
            'privacy_policy_html' => '<p>Cadet and member personal data, blood group records, and emergency contact details are encrypted and maintained with strict confidentiality under Bangladesh Data Protection norms.</p>',
            'delivery_policy_html' => '<p>Digital Volunteer ID Passes and QR-verified certifications are issued instantly. Physical hi-vis rescue vests and official membership lapel badges are dispatched within 3–5 working days nationwide.</p>',
            'about_story_html'    => '<p>Road Safety Movement (RSM) was founded as a grassroots youth uprising demanding the radical transformation of highway management, vehicular safety testing, and victim rights in Bangladesh.</p>',
            'nav_links'           => [
                ['label' => 'Home',      'label_bn' => 'মূলপাতা',          'href' => '/'],
                ['label' => 'Districts', 'label_bn' => '৬৪ জেলা ম্যাপ',     'href' => '/districts'],
                ['label' => 'Hierarchy', 'label_bn' => 'সাংগঠনিক কমান্ড',  'href' => '/hierarchy'],
                ['label' => 'About Us',  'label_bn' => 'আমাদের লক্ষ্য',     'href' => '/about'],
                ['label' => 'Academy',   'label_bn' => 'ক্যাডেট একাডেমি',   'href' => '/courses'],
                ['label' => 'Campaigns', 'label_bn' => 'ফিল্ড অ্যাকশন',     'href' => '/events'],
                ['label' => 'Notices',   'label_bn' => 'গেজেট ও সার্কুলার', 'href' => '/notices'],
                ['label' => 'Gallery',   'label_bn' => 'অ্যাকশন গ্যালারি',   'href' => '/gallery'],
            ],
            'footer_columns'      => [
                ['heading' => 'Movement', 'links' => [
                    ['label' => 'About RSM', 'href' => '/about'],
                    ['label' => '64 District Command', 'href' => '/districts'],
                    ['label' => '5-Tier Field Hierarchy', 'href' => '/hierarchy'],
                    ['label' => 'National Directorates', 'href' => '/hierarchy'],
                    ['label' => 'Field Action Gallery', 'href' => '/gallery'],
                ]],
                ['heading' => 'Programs & Action', 'links' => [
                    ['label' => 'First Responder Academy', 'href' => '/courses'],
                    ['label' => 'Campaigns & Blackspot Audits', 'href' => '/events'],
                    ['label' => 'Official Gazettes & Directives', 'href' => '/notices'],
                    ['label' => 'Volunteer Cadet Application', 'href' => '/apply'],
                ]],
                ['heading' => 'Compliance & Statutory', 'links' => [
                    ['label' => 'Constitution & Terms', 'href' => '/terms-condition'],
                    ['label' => 'Volunteer Privacy Policy', 'href' => '/privacy-policy'],
                    ['label' => 'Dues & Refund Framework', 'href' => '/refund-policy'],
                    ['label' => 'Cadet Kit Delivery Terms', 'href' => '/delivery-policy'],
                ]],
            ],
            'social_links' => [
                ['platform' => 'facebook',  'url' => 'https://facebook.com/roadsafetybd', 'icon' => 'fb'],
                ['platform' => 'youtube',   'url' => 'https://youtube.com/@roadsafetybd', 'icon' => 'yt'],
                ['platform' => 'twitter',   'url' => 'https://twitter.com/roadsafetybd', 'icon' => 'tw'],
                ['platform' => 'linkedin',  'url' => 'https://linkedin.com/company/roadsafetybd', 'icon' => 'li'],
            ],
            'section_visibility' => [
                'hero_3d'         => true,
                'stats_ticker'    => true,
                'alliances'       => true,
                'pillars'         => true,
                'command_flow'    => true,
                'district_globe'  => true,
                'directorates'    => true,
                'membership_plans'=> true,
                'faq'             => true,
                'cta_banner'      => true,
            ]
        ]);
    }
}
