<?php

namespace Database\Seeders;

use App\Models\District;
use App\Models\Event;
use App\Models\GalleryItem;
use App\Models\Notice;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RsmDataSeeder extends Seeder
{
    public function run(): void
    {
        // ── 1. ROLES (5-Tier RBAC + Custom Role Support) ───────────────────
        $rolesData = [
            [
                'name'        => 'Super Admin',
                'name_bn'     => 'সুপার অ্যাডমিন',
                'slug'        => 'super-admin',
                'tier_level'  => 1,
                'description' => 'Full national command authority across all CMS modules, districts, finances, and RBAC policies.',
                'permissions' => ['*'],
                'is_system'   => true,
            ],
            [
                'name'        => 'Directorate Lead',
                'name_bn'     => 'অধিদপ্তর প্রধান',
                'slug'        => 'directorate-lead',
                'tier_level'  => 2,
                'description' => 'Oversees national directorates (Field Operations, Crash Investigation, Legal, Training).',
                'permissions' => [
                    'members.view', 'members.edit', 'events.create', 'events.edit',
                    'notices.create', 'notices.edit', 'districts.view', 'reports.view', 'gallery.manage'
                ],
                'is_system'   => true,
            ],
            [
                'name'        => 'District Coordinator',
                'name_bn'     => 'জেলা সমন্বয়ক',
                'slug'        => 'district-coordinator',
                'tier_level'  => 3,
                'description' => 'Commands assigned district operations, leads local blackspot audits and field cadet brigades.',
                'permissions' => [
                    'members.view', 'districts.edit_self', 'events.create',
                    'reports.submit', 'cadets.verify', 'blackspots.report'
                ],
                'is_system'   => true,
            ],
            [
                'name'        => 'General Member',
                'name_bn'     => 'সাধারণ সদস্য',
                'slug'        => 'general-member',
                'tier_level'  => 4,
                'description' => 'Verified citizen advocate contributing to road crash prevention initiatives and public campaigns.',
                'permissions' => ['profile.manage', 'events.rsvp', 'courses.enroll', 'forum.participate'],
                'is_system'   => true,
            ],
            [
                'name'        => 'Volunteer Cadet',
                'name_bn'     => 'স্বেচ্ছাসেবক ক্যাডেট',
                'slug'        => 'volunteer-cadet',
                'tier_level'  => 5,
                'description' => 'Frontline roadside traffic monitor, school safety escort, and first-aid crash responder.',
                'permissions' => ['profile.manage', 'cadet.tasks', 'events.attend', 'courses.learn'],
                'is_system'   => true,
            ],
        ];

        $createdRoles = [];
        foreach ($rolesData as $role) {
            $createdRoles[$role['slug']] = Role::updateOrCreate(['slug' => $role['slug']], $role);
        }

        // ── 2. PRE-POPULATE ALL 64 BANGLADESH DISTRICTS ───────────────────
        $districts = [
            // DHAKA DIVISION (13)
            ['name_en' => 'Dhaka', 'name_bn' => 'ঢাকা', 'division' => 'Dhaka', 'code' => 'dha', 'lat' => 23.8103, 'lng' => 90.4125, 'volunteer_count' => 840, 'blackspots_count' => 46, 'status' => 'active', 'coordinator_name' => 'Fahim Rahman Chowdhury'],
            ['name_en' => 'Gazipur', 'name_bn' => 'গাজীপুর', 'division' => 'Dhaka', 'code' => 'gaz', 'lat' => 23.9999, 'lng' => 90.4203, 'volunteer_count' => 320, 'blackspots_count' => 28, 'status' => 'active', 'coordinator_name' => 'Tanvir Ahmed'],
            ['name_en' => 'Narayanganj', 'name_bn' => 'নারায়ণগঞ্জ', 'division' => 'Dhaka', 'code' => 'nar', 'lat' => 23.6238, 'lng' => 90.5000, 'volunteer_count' => 290, 'blackspots_count' => 22, 'status' => 'active', 'coordinator_name' => 'Mehedi Hasan'],
            ['name_en' => 'Tangail', 'name_bn' => 'টাঙ্গাইল', 'division' => 'Dhaka', 'code' => 'tan', 'lat' => 24.2513, 'lng' => 89.9167, 'volunteer_count' => 210, 'blackspots_count' => 19, 'status' => 'active', 'coordinator_name' => 'Shamim Reza'],
            ['name_en' => 'Kishoreganj', 'name_bn' => 'কিশোরগঞ্জ', 'division' => 'Dhaka', 'code' => 'kis', 'lat' => 24.4449, 'lng' => 90.7766, 'volunteer_count' => 140, 'blackspots_count' => 12, 'status' => 'active', 'coordinator_name' => 'Anisur Rahman'],
            ['name_en' => 'Manikganj', 'name_bn' => 'মানিকগঞ্জ', 'division' => 'Dhaka', 'code' => 'man', 'lat' => 23.8617, 'lng' => 90.0003, 'volunteer_count' => 115, 'blackspots_count' => 14, 'status' => 'active', 'coordinator_name' => 'Zakir Hossain'],
            ['name_en' => 'Munshiganj', 'name_bn' => 'মুন্সীগঞ্জ', 'division' => 'Dhaka', 'code' => 'mun', 'lat' => 23.5422, 'lng' => 90.5305, 'volunteer_count' => 95, 'blackspots_count' => 9, 'status' => 'forming', 'coordinator_name' => 'Kawsar Mahmud'],
            ['name_en' => 'Narsingdi', 'name_bn' => 'নরসিংদী', 'division' => 'Dhaka', 'code' => 'nsd', 'lat' => 23.9322, 'lng' => 90.7154, 'volunteer_count' => 180, 'blackspots_count' => 17, 'status' => 'active', 'coordinator_name' => 'Asaduzzaman Nur'],
            ['name_en' => 'Faridpur', 'name_bn' => 'ফরিদপুর', 'division' => 'Dhaka', 'code' => 'far', 'lat' => 23.6071, 'lng' => 89.8429, 'volunteer_count' => 130, 'blackspots_count' => 15, 'status' => 'active', 'coordinator_name' => 'Sabbir Ahmed'],
            ['name_en' => 'Gopalganj', 'name_bn' => 'গোপালগঞ্জ', 'division' => 'Dhaka', 'code' => 'gop', 'lat' => 23.0051, 'lng' => 89.8266, 'volunteer_count' => 85, 'blackspots_count' => 8, 'status' => 'forming', 'coordinator_name' => 'Mahbubur Rahman'],
            ['name_en' => 'Madaripur', 'name_bn' => 'মাদারীপুর', 'division' => 'Dhaka', 'code' => 'mad', 'lat' => 23.1641, 'lng' => 90.1897, 'volunteer_count' => 90, 'blackspots_count' => 11, 'status' => 'forming', 'coordinator_name' => 'Rashedul Islam'],
            ['name_en' => 'Rajbari', 'name_bn' => 'রাজবাড়ী', 'division' => 'Dhaka', 'code' => 'rajb', 'lat' => 23.7574, 'lng' => 89.6445, 'volunteer_count' => 70, 'blackspots_count' => 7, 'status' => 'needs_volunteers', 'coordinator_name' => null],
            ['name_en' => 'Shariatpur', 'name_bn' => 'শরীয়তপুর', 'division' => 'Dhaka', 'code' => 'sha', 'lat' => 23.2423, 'lng' => 90.4348, 'volunteer_count' => 65, 'blackspots_count' => 6, 'status' => 'needs_volunteers', 'coordinator_name' => null],

            // CHITTAGONG DIVISION (11)
            ['name_en' => 'Chittagong', 'name_bn' => 'চট্টগ্রাম', 'division' => 'Chittagong', 'code' => 'ctg', 'lat' => 22.3569, 'lng' => 91.7832, 'volunteer_count' => 620, 'blackspots_count' => 38, 'status' => 'active', 'coordinator_name' => 'Naimur Rahman Chowdhury'],
            ['name_en' => "Cox's Bazar", 'name_bn' => 'কক্সবাজার', 'division' => 'Chittagong', 'code' => 'cox', 'lat' => 21.4272, 'lng' => 92.0058, 'volunteer_count' => 210, 'blackspots_count' => 16, 'status' => 'active', 'coordinator_name' => 'Zubair Hossain'],
            ['name_en' => 'Comilla', 'name_bn' => 'কুমিল্লা', 'division' => 'Chittagong', 'code' => 'com', 'lat' => 23.4682, 'lng' => 91.1788, 'volunteer_count' => 340, 'blackspots_count' => 24, 'status' => 'active', 'coordinator_name' => 'Ibrahim Khalil'],
            ['name_en' => 'Feni', 'name_bn' => 'ফেনী', 'division' => 'Chittagong', 'code' => 'fen', 'lat' => 23.0159, 'lng' => 91.3976, 'volunteer_count' => 150, 'blackspots_count' => 13, 'status' => 'active', 'coordinator_name' => 'Kamrul Hasan'],
            ['name_en' => 'Brahmanbaria', 'name_bn' => 'ব্রাহ্মণবাড়িয়া', 'division' => 'Chittagong', 'code' => 'bra', 'lat' => 23.9571, 'lng' => 91.1119, 'volunteer_count' => 175, 'blackspots_count' => 15, 'status' => 'active', 'coordinator_name' => 'Nurul Islam'],
            ['name_en' => 'Chandpur', 'name_bn' => 'চাঁদপুর', 'division' => 'Chittagong', 'code' => 'cha', 'lat' => 23.2333, 'lng' => 90.6667, 'volunteer_count' => 130, 'blackspots_count' => 10, 'status' => 'active', 'coordinator_name' => 'Faruk Hossain'],
            ['name_en' => 'Lakshmipur', 'name_bn' => 'লক্ষ্মীপুর', 'division' => 'Chittagong', 'code' => 'lak', 'lat' => 22.9425, 'lng' => 90.8412, 'volunteer_count' => 85, 'blackspots_count' => 7, 'status' => 'forming', 'coordinator_name' => 'Monirul Islam'],
            ['name_en' => 'Noakhali', 'name_bn' => 'নোয়াখালী', 'division' => 'Chittagong', 'code' => 'noa', 'lat' => 22.8696, 'lng' => 91.0994, 'volunteer_count' => 160, 'blackspots_count' => 12, 'status' => 'active', 'coordinator_name' => 'Shah Alam'],
            ['name_en' => 'Khagrachhari', 'name_bn' => 'খাগড়াছড়ি', 'division' => 'Chittagong', 'code' => 'kha', 'lat' => 23.1193, 'lng' => 91.9847, 'volunteer_count' => 55, 'blackspots_count' => 8, 'status' => 'needs_volunteers', 'coordinator_name' => null],
            ['name_en' => 'Rangamati', 'name_bn' => 'রাঙ্গামাটি', 'division' => 'Chittagong', 'code' => 'ran', 'lat' => 22.7324, 'lng' => 92.2985, 'volunteer_count' => 60, 'blackspots_count' => 9, 'status' => 'needs_volunteers', 'coordinator_name' => null],
            ['name_en' => 'Bandarban', 'name_bn' => 'বান্দরবান', 'division' => 'Chittagong', 'code' => 'ban', 'lat' => 22.1953, 'lng' => 92.2184, 'volunteer_count' => 50, 'blackspots_count' => 7, 'status' => 'needs_volunteers', 'coordinator_name' => null],

            // RAJSHAHI DIVISION (8)
            ['name_en' => 'Rajshahi', 'name_bn' => 'রাজশাহী', 'division' => 'Rajshahi', 'code' => 'raj', 'lat' => 24.3745, 'lng' => 88.6042, 'volunteer_count' => 380, 'blackspots_count' => 21, 'status' => 'active', 'coordinator_name' => 'Tariqul Islam'],
            ['name_en' => 'Bogra', 'name_bn' => 'বগুড়া', 'division' => 'Rajshahi', 'code' => 'bog', 'lat' => 24.8465, 'lng' => 89.3777, 'volunteer_count' => 270, 'blackspots_count' => 23, 'status' => 'active', 'coordinator_name' => 'Mahfuzur Rahman'],
            ['name_en' => 'Joypurhat', 'name_bn' => 'জয়পুরহাট', 'division' => 'Rajshahi', 'code' => 'joy', 'lat' => 25.1015, 'lng' => 89.0275, 'volunteer_count' => 75, 'blackspots_count' => 6, 'status' => 'forming', 'coordinator_name' => 'Golam Mostafa'],
            ['name_en' => 'Naogaon', 'name_bn' => 'নওগাঁ', 'division' => 'Rajshahi', 'code' => 'nao', 'lat' => 24.7936, 'lng' => 88.9318, 'volunteer_count' => 110, 'blackspots_count' => 9, 'status' => 'forming', 'coordinator_name' => 'Shahidul Islam'],
            ['name_en' => 'Natore', 'name_bn' => 'নাটোর', 'division' => 'Rajshahi', 'code' => 'nat', 'lat' => 24.4206, 'lng' => 89.0003, 'volunteer_count' => 125, 'blackspots_count' => 14, 'status' => 'active', 'coordinator_name' => 'Abdur Rahim'],
            ['name_en' => 'Chapainawabganj', 'name_bn' => 'চাঁপাইনবাবগঞ্জ', 'division' => 'Rajshahi', 'code' => 'cnw', 'lat' => 24.5965, 'lng' => 88.2776, 'volunteer_count' => 95, 'blackspots_count' => 8, 'status' => 'forming', 'coordinator_name' => 'Ziaur Rahman'],
            ['name_en' => 'Pabna', 'name_bn' => 'পাবনা', 'division' => 'Rajshahi', 'code' => 'pab', 'lat' => 24.0064, 'lng' => 89.2372, 'volunteer_count' => 150, 'blackspots_count' => 16, 'status' => 'active', 'coordinator_name' => 'Emran Hossain'],
            ['name_en' => 'Sirajganj', 'name_bn' => 'সিরাজগঞ্জ', 'division' => 'Rajshahi', 'code' => 'sir', 'lat' => 24.4534, 'lng' => 89.7008, 'volunteer_count' => 220, 'blackspots_count' => 26, 'status' => 'active', 'coordinator_name' => 'Babul Mia'],

            // KHULNA DIVISION (10)
            ['name_en' => 'Khulna', 'name_bn' => 'খুলনা', 'division' => 'Khulna', 'code' => 'khu', 'lat' => 22.8456, 'lng' => 89.5403, 'volunteer_count' => 310, 'blackspots_count' => 19, 'status' => 'active', 'coordinator_name' => 'Mominul Haque'],
            ['name_en' => 'Bagerhat', 'name_bn' => 'বাগেরহাট', 'division' => 'Khulna', 'code' => 'bag', 'lat' => 22.6516, 'lng' => 89.7859, 'volunteer_count' => 80, 'blackspots_count' => 7, 'status' => 'forming', 'coordinator_name' => 'Ashraful Alam'],
            ['name_en' => 'Chuadanga', 'name_bn' => 'চুয়াডাঙ্গা', 'division' => 'Khulna', 'code' => 'chu', 'lat' => 23.6402, 'lng' => 88.8418, 'volunteer_count' => 85, 'blackspots_count' => 9, 'status' => 'forming', 'coordinator_name' => 'Hasanuzzaman'],
            ['name_en' => 'Jessore', 'name_bn' => 'যশোর', 'division' => 'Khulna', 'code' => 'jes', 'lat' => 23.1664, 'lng' => 89.2081, 'volunteer_count' => 240, 'blackspots_count' => 18, 'status' => 'active', 'coordinator_name' => 'Saidur Rahman'],
            ['name_en' => 'Jhenaidah', 'name_bn' => 'ঝিনাইদহ', 'division' => 'Khulna', 'code' => 'jhe', 'lat' => 23.5450, 'lng' => 89.1526, 'volunteer_count' => 110, 'blackspots_count' => 11, 'status' => 'forming', 'coordinator_name' => 'Ruhul Amin'],
            ['name_en' => 'Kushtia', 'name_bn' => 'কুষ্টিয়া', 'division' => 'Khulna', 'code' => 'kus', 'lat' => 23.9013, 'lng' => 89.1205, 'volunteer_count' => 165, 'blackspots_count' => 14, 'status' => 'active', 'coordinator_name' => 'Nasir Uddin'],
            ['name_en' => 'Magura', 'name_bn' => 'মাগুরা', 'division' => 'Khulna', 'code' => 'mag', 'lat' => 23.4873, 'lng' => 89.4199, 'volunteer_count' => 70, 'blackspots_count' => 6, 'status' => 'needs_volunteers', 'coordinator_name' => null],
            ['name_en' => 'Meherpur', 'name_bn' => 'মেহেরপুর', 'division' => 'Khulna', 'code' => 'meh', 'lat' => 23.7712, 'lng' => 88.6318, 'volunteer_count' => 60, 'blackspots_count' => 5, 'status' => 'needs_volunteers', 'coordinator_name' => null],
            ['name_en' => 'Narail', 'name_bn' => 'নড়াইল', 'division' => 'Khulna', 'code' => 'nrl', 'lat' => 23.1725, 'lng' => 89.5127, 'volunteer_count' => 65, 'blackspots_count' => 6, 'status' => 'needs_volunteers', 'coordinator_name' => null],
            ['name_en' => 'Satkhira', 'name_bn' => 'সাতক্ষীরা', 'division' => 'Khulna', 'code' => 'sat', 'lat' => 22.7185, 'lng' => 89.0705, 'volunteer_count' => 95, 'blackspots_count' => 8, 'status' => 'forming', 'coordinator_name' => 'Abu Bakar'],

            // BARISAL DIVISION (6)
            ['name_en' => 'Barisal', 'name_bn' => 'বরিশাল', 'division' => 'Barisal', 'code' => 'bar', 'lat' => 22.7010, 'lng' => 90.3535, 'volunteer_count' => 210, 'blackspots_count' => 13, 'status' => 'active', 'coordinator_name' => 'Sultan Mahmud'],
            ['name_en' => 'Barguna', 'name_bn' => 'বরগুনা', 'division' => 'Barisal', 'code' => 'brg', 'lat' => 22.1570, 'lng' => 90.1256, 'volunteer_count' => 65, 'blackspots_count' => 5, 'status' => 'needs_volunteers', 'coordinator_name' => null],
            ['name_en' => 'Bhola', 'name_bn' => 'ভোলা', 'division' => 'Barisal', 'code' => 'bho', 'lat' => 22.6859, 'lng' => 90.6481, 'volunteer_count' => 90, 'blackspots_count' => 6, 'status' => 'forming', 'coordinator_name' => 'Monir Hossain'],
            ['name_en' => 'Jhalokati', 'name_bn' => 'ঝালকাঠি', 'division' => 'Barisal', 'code' => 'jha', 'lat' => 22.6406, 'lng' => 90.1987, 'volunteer_count' => 50, 'blackspots_count' => 4, 'status' => 'needs_volunteers', 'coordinator_name' => null],
            ['name_en' => 'Patuakhali', 'name_bn' => 'পটুয়াখালী', 'division' => 'Barisal', 'code' => 'pat', 'lat' => 22.3596, 'lng' => 90.3298, 'volunteer_count' => 80, 'blackspots_count' => 7, 'status' => 'forming', 'coordinator_name' => 'Belal Ahmed'],
            ['name_en' => 'Pirojpur', 'name_bn' => 'পিরোজপুর', 'division' => 'Barisal', 'code' => 'pir', 'lat' => 22.5841, 'lng' => 89.9720, 'volunteer_count' => 55, 'blackspots_count' => 5, 'status' => 'needs_volunteers', 'coordinator_name' => null],

            // SYLHET DIVISION (4)
            ['name_en' => 'Sylhet', 'name_bn' => 'সিলেট', 'division' => 'Sylhet', 'code' => 'syl', 'lat' => 24.8949, 'lng' => 91.8687, 'volunteer_count' => 320, 'blackspots_count' => 22, 'status' => 'active', 'coordinator_name' => 'Syed Mujtaba Ali'],
            ['name_en' => 'Habiganj', 'name_bn' => 'হবিগঞ্জ', 'division' => 'Sylhet', 'code' => 'hab', 'lat' => 24.3749, 'lng' => 91.4155, 'volunteer_count' => 120, 'blackspots_count' => 14, 'status' => 'active', 'coordinator_name' => 'Dewan Farhad'],
            ['name_en' => 'Moulvibazar', 'name_bn' => 'মৌলভীবাজার', 'division' => 'Sylhet', 'code' => 'mou', 'lat' => 24.4829, 'lng' => 91.7774, 'volunteer_count' => 140, 'blackspots_count' => 11, 'status' => 'active', 'coordinator_name' => 'Khaled Saifullah'],
            ['name_en' => 'Sunamganj', 'name_bn' => 'সুনামগঞ্জ', 'division' => 'Sylhet', 'code' => 'sun', 'lat' => 25.0658, 'lng' => 91.3950, 'volunteer_count' => 80, 'blackspots_count' => 6, 'status' => 'forming', 'coordinator_name' => 'Anwar Hossain'],

            // RANGPUR DIVISION (8)
            ['name_en' => 'Rangpur', 'name_bn' => 'রংপুর', 'division' => 'Rangpur', 'code' => 'ranp', 'lat' => 25.7439, 'lng' => 89.2752, 'volunteer_count' => 260, 'blackspots_count' => 18, 'status' => 'active', 'coordinator_name' => 'Abdul Latif'],
            ['name_en' => 'Dinajpur', 'name_bn' => 'দিনাজপুর', 'division' => 'Rangpur', 'code' => 'din', 'lat' => 25.6217, 'lng' => 88.6355, 'volunteer_count' => 170, 'blackspots_count' => 13, 'status' => 'active', 'coordinator_name' => 'Motiur Rahman'],
            ['name_en' => 'Gaibandha', 'name_bn' => 'গাইবান্ধা', 'division' => 'Rangpur', 'code' => 'gai', 'lat' => 25.3288, 'lng' => 89.5430, 'volunteer_count' => 95, 'blackspots_count' => 8, 'status' => 'forming', 'coordinator_name' => 'Sirajul Islam'],
            ['name_en' => 'Kurigram', 'name_bn' => 'কুড়িগ্রাম', 'division' => 'Rangpur', 'code' => 'kur', 'lat' => 25.8054, 'lng' => 89.6362, 'volunteer_count' => 75, 'blackspots_count' => 7, 'status' => 'forming', 'coordinator_name' => 'Lutfar Rahman'],
            ['name_en' => 'Lalmonirhat', 'name_bn' => 'লালমনিরহাট', 'division' => 'Rangpur', 'code' => 'lal', 'lat' => 25.9923, 'lng' => 89.2847, 'volunteer_count' => 65, 'blackspots_count' => 5, 'status' => 'needs_volunteers', 'coordinator_name' => null],
            ['name_en' => 'Nilphamari', 'name_bn' => 'নীলফামারী', 'division' => 'Rangpur', 'code' => 'nil', 'lat' => 25.9318, 'lng' => 88.8560, 'volunteer_count' => 80, 'blackspots_count' => 6, 'status' => 'forming', 'coordinator_name' => 'Hafizur Rahman'],
            ['name_en' => 'Panchagarh', 'name_bn' => 'পঞ্চগড়', 'division' => 'Rangpur', 'code' => 'pan', 'lat' => 26.3411, 'lng' => 88.5542, 'volunteer_count' => 60, 'blackspots_count' => 4, 'status' => 'needs_volunteers', 'coordinator_name' => null],
            ['name_en' => 'Thakurgaon', 'name_bn' => 'ঠাকুরগাঁও', 'division' => 'Rangpur', 'code' => 'tha', 'lat' => 26.0337, 'lng' => 88.4617, 'volunteer_count' => 70, 'blackspots_count' => 5, 'status' => 'needs_volunteers', 'coordinator_name' => null],

            // MYMENSINGH DIVISION (4)
            ['name_en' => 'Mymensingh', 'name_bn' => 'ময়মনসিংহ', 'division' => 'Mymensingh', 'code' => 'mym', 'lat' => 24.7471, 'lng' => 90.4203, 'volunteer_count' => 280, 'blackspots_count' => 19, 'status' => 'active', 'coordinator_name' => 'Ferdous Wahid'],
            ['name_en' => 'Jamalpur', 'name_bn' => 'জামালপুর', 'division' => 'Mymensingh', 'code' => 'jam', 'lat' => 24.9375, 'lng' => 89.9378, 'volunteer_count' => 110, 'blackspots_count' => 11, 'status' => 'forming', 'coordinator_name' => 'Mostafizur Rahman'],
            ['name_en' => 'Netrokona', 'name_bn' => 'নেত্রকোণা', 'division' => 'Mymensingh', 'code' => 'net', 'lat' => 24.8709, 'lng' => 90.7279, 'volunteer_count' => 85, 'blackspots_count' => 7, 'status' => 'forming', 'coordinator_name' => 'Shamsul Alam'],
            ['name_en' => 'Sherpur', 'name_bn' => 'শেরপুর', 'division' => 'Mymensingh', 'code' => 'she', 'lat' => 25.0205, 'lng' => 90.0153, 'volunteer_count' => 70, 'blackspots_count' => 6, 'status' => 'needs_volunteers', 'coordinator_name' => null],
        ];

        $districtMap = [];
        foreach ($districts as $d) {
            $created = District::updateOrCreate(
                ['code' => $d['code']],
                array_merge($d, [
                    'coordinator_phone' => $d['coordinator_name'] ? '+880 1711-'.rand(100000, 999999) : null,
                    'coordinator_email' => $d['coordinator_name'] ? strtolower(Str::slug($d['name_en'])).'.rsm@gmail.com' : null,
                    'blackspot_notes'   => 'National Highway intersection speed hazard & pedestrian crossing corridor.',
                    'is_active'         => true,
                ])
            );
            $districtMap[$d['code']] = $created;
        }

        // ── 3. UPDATE/CREATE USERS WITH 5-TIER RBAC ───────────────────────
        $superAdminRole = $createdRoles['super-admin'];
        $dirLeadRole    = $createdRoles['directorate-lead'];
        $distCoordRole  = $createdRoles['district-coordinator'];
        $genMemberRole  = $createdRoles['general-member'];
        $cadetRole      = $createdRoles['volunteer-cadet'];

        // Super Admin 1 (Road Safety Movement)
        User::updateOrCreate(
            ['email' => 'admin@roadsafetymovement.org'],
            [
                'name'              => 'Engr. Mushfiqur Rahman',
                'password'          => Hash::make('password'),
                'role_id'           => $superAdminRole->id,
                'status'            => 'active',
                'phone'             => '+880 1717-395047',
                'blood_group'       => 'O+',
                'emergency_contact' => '+880 1819-000000',
                'badge_number'      => 'RSM-HQ-001',
                'member_since'      => now()->subYears(3),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'superadmin@roadsafetymovement.org.bd'],
            [
                'name'              => 'National Secretariat Commander',
                'password'          => Hash::make('password'),
                'role_id'           => $superAdminRole->id,
                'status'            => 'active',
                'phone'             => '+880 1717-395047',
                'blood_group'       => 'O+',
                'emergency_contact' => '+880 1819-000000',
                'badge_number'      => 'RSM-HQ-000',
                'member_since'      => now()->subYears(3),
                'email_verified_at' => now(),
            ]
        );

        // Super Admin 2 (legacy support)
        User::updateOrCreate(
            ['email' => 'admin@agriolympiad.org'],
            [
                'name'              => 'Chief System Administrator',
                'password'          => Hash::make('password'),
                'role_id'           => $superAdminRole->id,
                'status'            => 'active',
                'phone'             => '+880 1700-111222',
                'blood_group'       => 'B+',
                'badge_number'      => 'RSM-SYS-000',
                'member_since'      => now()->subYears(2),
                'email_verified_at' => now(),
            ]
        );

        // Directorate Lead (Tier 2)
        User::updateOrCreate(
            ['email' => 'operations@roadsafetymovement.org'],
            [
                'name'              => 'Dr. Sabrina Yesmin (Directorate Lead - Crash Ops)',
                'password'          => Hash::make('password'),
                'role_id'           => $dirLeadRole->id,
                'directorate'       => 'Field Operations & Crash Rescue',
                'status'            => 'active',
                'phone'             => '+880 1712-334455',
                'blood_group'       => 'A+',
                'badge_number'      => 'RSM-DIR-002',
                'member_since'      => now()->subYears(2),
                'email_verified_at' => now(),
            ]
        );

        // District Coordinator (Tier 3)
        $dhakaDistrict = $districtMap['dha'] ?? null;
        User::updateOrCreate(
            ['email' => 'coordinator.dhaka@roadsafetymovement.org'],
            [
                'name'              => 'Fahim Rahman Chowdhury (Dhaka District Coordinator)',
                'password'          => Hash::make('password'),
                'role_id'           => $distCoordRole->id,
                'district_id'       => $dhakaDistrict?->id,
                'status'            => 'active',
                'phone'             => '+880 1711-556677',
                'blood_group'       => 'O+',
                'badge_number'      => 'RSM-DC-DHA-01',
                'member_since'      => now()->subMonths(18),
                'email_verified_at' => now(),
            ]
        );

        // General Member (Tier 4)
        User::updateOrCreate(
            ['email' => 'member.nadim@gmail.com'],
            [
                'name'              => 'Nadim Hossain',
                'password'          => Hash::make('password'),
                'role_id'           => $genMemberRole->id,
                'district_id'       => $dhakaDistrict?->id,
                'status'            => 'active',
                'phone'             => '+880 1819-778899',
                'blood_group'       => 'AB+',
                'badge_number'      => 'RSM-GM-1042',
                'member_since'      => now()->subMonths(8),
                'email_verified_at' => now(),
            ]
        );

        // Volunteer Cadet (Tier 5)
        User::updateOrCreate(
            ['email' => 'cadet.tania@gmail.com'],
            [
                'name'              => 'Tania Akhter (Roadside First Responder)',
                'password'          => Hash::make('password'),
                'role_id'           => $cadetRole->id,
                'district_id'       => $dhakaDistrict?->id,
                'status'            => 'active',
                'phone'             => '+880 1912-332211',
                'blood_group'       => 'B+',
                'badge_number'      => 'RSM-CDT-8921',
                'member_since'      => now()->subMonths(3),
                'email_verified_at' => now(),
            ]
        );

        // ── 4. CAMPAIGNS & EVENTS ──────────────────────────────────────────
        $eventsData = [
            [
                'title'           => 'National Vision Zero 2026 Policy Hearing & Highway Safety Summit',
                'title_bn'        => 'জাতীয় ভিশন জিরো ২০২৬ নীতি সংলাপ ও হাইওয়ে নিরাপত্তা সম্মেলন',
                'slug'            => 'national-vision-zero-summit-2026',
                'summary'         => 'Convening policymakers, transport engineers, BUET ARI scientists, and crash victims to present the 64-District Blackspot Audit Report.',
                'description'     => 'A landmark national assembly presenting scientific crash data and demanding statutory highway engineering reforms under the Road Transport Act.',
                'event_date'      => now()->addDays(12)->setTime(10, 0),
                'location'        => 'Bangabandhu International Conference Center (BICC), Agargaon, Dhaka',
                'location_bn'     => 'বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্র, ঢাকা',
                'district_id'     => $dhakaDistrict?->id,
                'type'            => 'hearing',
                'image_url'       => '/images/events/vision-zero-summit.jpg',
                'attendees_count' => 1250,
                'is_featured'     => true,
            ],
            [
                'title'           => 'Dhaka-Chittagong Expressway (N1) Blackspot Safety Inspection & Rapid Audit',
                'title_bn'        => 'ঢাকা-চট্টগ্রাম মহাসড়ক (এন-১) দুর্ঘটনাস্থল ও ব্ল্যাকস্পট সরাসরি মাঠপর্যায়ে পরিদর্শন',
                'slug'            => 'n1-expressway-blackspot-audit',
                'summary'         => 'Mobilizing 80 trained cadet engineers with LiDAR speed guns and reflective audit markers across 24 high-casualty curves.',
                'description'     => 'Direct on-site engineering survey measuring sightline obstructions, missing guardrails, and unregulated pedestrian cuts between Daudkandi and Sitakunda.',
                'event_date'      => now()->addDays(24)->setTime(8, 30),
                'location'        => 'Feni & Comilla Highway Corridor (N1)',
                'location_bn'     => 'ফেনী ও কুমিল্লা হাইওয়ে করিডোর',
                'district_id'     => $districtMap['com']->id ?? null,
                'type'            => 'audit',
                'image_url'       => '/images/events/highway-audit.jpg',
                'attendees_count' => 320,
                'is_featured'     => true,
            ],
            [
                'title'           => '64-District Volunteer Cadet First Responder Bootcamp',
                'title_bn'        => '৬৪ জেলায় স্বেচ্ছাসেবক ক্যাডেট প্রাথমিক চিকিৎসা ও রেসকিউ বুটক্যাম্প',
                'slug'            => 'cadet-first-responder-bootcamp',
                'summary'         => 'Intensive golden-hour emergency trauma resuscitation, roadside bleeding control, and crowd management training.',
                'description'     => 'Equipping youth volunteers with professional medical rescue kits and emergency triage procedures certified by emergency physicians.',
                'event_date'      => now()->addDays(35)->setTime(9, 0),
                'location'        => 'Central Field Command Ground, Uttara, Dhaka',
                'location_bn'     => 'কেন্দ্রীয় ফিল্ড কমান্ড গ্রাউন্ড, উত্তরা, ঢাকা',
                'district_id'     => $dhakaDistrict?->id,
                'type'            => 'training',
                'image_url'       => '/images/events/cadet-training.jpg',
                'attendees_count' => 600,
                'is_featured'     => true,
            ],
            [
                'title'           => 'National Zebra Crossing & Pedestrian Right-of-Way Campaign',
                'title_bn'        => 'জেব্রা ক্রসিং ও পথচারীর অধিকার সুরক্ষা বিষয়ক দেশব্যাপী জনসচেতনতা কর্মসূচি',
                'slug'            => 'pedestrian-right-of-way-campaign',
                'summary'         => 'Simultaneous citizen awareness rallies and driver sensitization across all major university campus roads and school zones.',
                'description'     => 'Volunteers painting high-visibility zebra crossings and distributing road safety handbooks to heavy vehicle operators.',
                'event_date'      => now()->subDays(15)->setTime(11, 0),
                'location'        => 'Shahbagh & Farmgate Intersection, Dhaka',
                'location_bn'     => 'শাহবাগ ও ফার্মগেট মোড়, ঢাকা',
                'district_id'     => $dhakaDistrict?->id,
                'type'            => 'rally',
                'image_url'       => '/images/events/zebra-crossing.jpg',
                'attendees_count' => 2400,
                'is_featured'     => false,
            ],
        ];

        foreach ($eventsData as $ev) {
            Event::updateOrCreate(['slug' => $ev['slug']], $ev);
        }

        // ── 5. OFFICIAL NOTICES & GAZETTES ─────────────────────────────────
        $noticesData = [
            [
                'memo_no'      => 'RSM/HQ/2026/GZ-042',
                'title'        => 'National Directive on Eliminating Highway Crash Blackspots: Joint Audit Protocol 2026',
                'title_bn'     => 'মহাসড়কের দুর্ঘটনাকবলিত ব্ল্যাকস্পট সংস্কারে সমন্বিত অডিট প্রোটোকল সংক্রান্ত জাতীয় নির্দেশনা ২০২৬',
                'slug'         => 'directive-joint-audit-protocol-2026',
                'category'     => 'gazette',
                'priority'     => 'urgent',
                'body_html'    => '<p>In accordance with the Central Secretariat Resolution 09/2026, all District Coordinators are instructed to complete Phase-1 LiDAR safety profiling of designated collision nodes by November 30.</p><p>Coordinators must submit the geo-tagged footage and victim incident reports directly to the Directorate of Crash Investigation.</p>',
                'pdf_url'      => '/docs/gazette-2026-042.pdf',
                'published_at' => now()->subDays(4),
                'signed_by'    => 'Engr. Mushfiqur Rahman (National Convener)',
                'is_pinned'    => true,
            ],
            [
                'memo_no'      => 'RSM/DIR/TRAIN/2026-19',
                'title'        => 'Standard Operating Procedure (SOP) for Roadside First Responders & Golden Hour Trauma Care',
                'title_bn'     => 'সড়ক দুর্ঘটনায় গোল্ডেন আওয়ার জরুরি চিকিৎসা ও স্বেচ্ছাসেবক ক্যাডেট এসওপি নির্দেশনা',
                'slug'         => 'sop-first-responders-golden-hour',
                'category'     => 'policy',
                'priority'     => 'high',
                'body_html'    => '<p>Standard protocol for Volunteer Cadets arriving first on road crash scenes: Immediate 999 alert, cervical spine stabilization, hemorrhagic tourniquet application, and crowd perimeter control.</p>',
                'pdf_url'      => '/docs/sop-first-responder.pdf',
                'published_at' => now()->subDays(12),
                'signed_by'    => 'Dr. Sabrina Yesmin (Director of Medical Rescue)',
                'is_pinned'    => true,
            ],
            [
                'memo_no'      => 'RSM/CIR/DIST-64/007',
                'title'        => 'Enrollment Window for 64-District Volunteer Brigade & Campus Road Safety Cells',
                'title_bn'     => '৬৪ জেলায় স্বেচ্ছাসেবক ব্রিগেড ও শিক্ষাপ্রতিষ্ঠানভিত্তিক রোড সেফটি সেল নিবন্ধন বিজ্ঞপ্তি',
                'slug'         => 'enrollment-64-district-cadet-brigade',
                'category'     => 'circular',
                'priority'     => 'routine',
                'body_html'    => '<p>Applications are formally invited from university and college students nationwide for the 2026 Volunteer Cadet intake across all 64 districts. Selected cadets receive certified life-saving training and official credentials.</p>',
                'pdf_url'      => '/docs/cadet-enrollment-circular.pdf',
                'published_at' => now()->subDays(20),
                'signed_by'    => 'Tanvir Ahmed (Director of Youth Mobilization)',
                'is_pinned'    => false,
            ],
        ];

        foreach ($noticesData as $notice) {
            Notice::updateOrCreate(['slug' => $notice['slug']], $notice);
        }

        // ── 6. GALLERY ITEMS ───────────────────────────────────────────────
        $galleryData = [
            [
                'title'        => 'Night-Time Highway Speed & Lighting Audit on N1 Highway',
                'title_bn'     => 'এন-১ ঢাকা-চট্টগ্রাম মহাসড়কে রাতের গতি ও আলোকস্বল্পতা অডিট',
                'category'     => 'blackspot_audit',
                'image_url'    => '/images/gallery/night-audit.jpg',
                'caption'      => 'Cadet engineers testing retroreflective signage along blind curves in Sitakunda.',
                'district_id'  => $districtMap['ctg']->id ?? null,
                'captured_at'  => now()->subDays(5),
                'sort_order'   => 1,
                'is_featured'  => true,
            ],
            [
                'title'        => 'Emergency Roadside Bleeding Control Drill in Gazipur',
                'title_bn'     => 'গাজীপুরে সড়ক দুর্ঘটনায় রক্তপাত বন্ধে ক্যাডেটদের প্রত্যক্ষ মহড়া',
                'category'     => 'field_action',
                'image_url'    => '/images/gallery/trauma-drill.jpg',
                'caption'      => 'Training 120 volunteer transport workers and students in practical trauma stabilization.',
                'district_id'  => $districtMap['gaz']->id ?? null,
                'captured_at'  => now()->subDays(10),
                'sort_order'   => 2,
                'is_featured'  => true,
            ],
            [
                'title'        => 'School Zone Zebra Crossing Installation by Sylhet Cadets',
                'title_bn'     => 'সিলেট জেলায় স্কুল জোনে স্থায়ী জেব্রা ক্রসিং অঙ্কন ও ট্রাফিক মহড়া',
                'category'     => 'youth_cadets',
                'image_url'    => '/images/gallery/school-zebra.jpg',
                'caption'      => 'Cadets marking bright 3D optical zebra crossings outside Gov. Pilot High School.',
                'district_id'  => $districtMap['syl']->id ?? null,
                'captured_at'  => now()->subDays(18),
                'sort_order'   => 3,
                'is_featured'  => true,
            ],
            [
                'title'        => 'National Citizens Rally for Speed Governors and Fit Buses',
                'title_bn'     => 'স্পিড গভর্নর ও ফিটনেসবিহীন বাস বন্ধের দাবিতে কেন্দ্রীয় নাগরিক সমাবেশ',
                'category'     => 'national_rally',
                'image_url'    => '/images/gallery/central-rally.jpg',
                'caption'      => 'Over 5,000 citizens and student leaders uniting at Central Shaheed Minar.',
                'district_id'  => $dhakaDistrict?->id,
                'captured_at'  => now()->subDays(25),
                'sort_order'   => 4,
                'is_featured'  => true,
            ],
        ];

        foreach ($galleryData as $gal) {
            GalleryItem::updateOrCreate(['title' => $gal['title']], $gal);
        }
    }
}
