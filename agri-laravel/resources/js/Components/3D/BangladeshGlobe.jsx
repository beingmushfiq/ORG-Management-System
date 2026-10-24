import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import bdOutlineData from '@/data/bd-outline-svg.json';
import bdDivisionsData from '@/data/bd-divisions-svg.json';
import bdDistrictsData from '@/data/bd-districts-svg.json';

/* ═══════════════════════════════════════════════════════════════════════
   BANGLADESH GEO DATA — All 64 Districts with coordinates, division, & blackspots
   ═══════════════════════════════════════════════════════════════════════ */
export const DISTRICTS = [
    // Dhaka Division (13)
    { code: 'dhaka', name: 'Dhaka', nameBn: 'ঢাকা', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.8103, lng: 90.4125, cadets: 850, blackspots: 28, risk: 'High', coordinator: 'Fahim Rahman Chowdhury', phone: '+880 1711-556677' },
    { code: 'gazipur', name: 'Gazipur', nameBn: 'গাজীপুর', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 24.0023, lng: 90.4264, cadets: 420, blackspots: 19, risk: 'High', coordinator: 'Tanvir Ahmed', phone: '+880 1712-445566' },
    { code: 'narayanganj', name: 'Narayanganj', nameBn: 'নারায়ণগঞ্জ', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.6238, lng: 90.5000, cadets: 310, blackspots: 14, risk: 'Medium', coordinator: 'Mehedi Hasan', phone: '+880 1713-556677' },
    { code: 'tangail', name: 'Tangail', nameBn: 'টাঙ্গাইল', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 24.2513, lng: 89.9167, cadets: 260, blackspots: 11, risk: 'Medium', coordinator: 'Shamim Reza', phone: '+880 1714-667788' },
    { code: 'kishoreganj', name: 'Kishoreganj', nameBn: 'কিশোরগঞ্জ', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 24.4449, lng: 90.7766, cadets: 190, blackspots: 7, risk: 'Low', coordinator: 'Anisur Rahman', phone: '+880 1715-778899' },
    { code: 'manikganj', name: 'Manikganj', nameBn: 'মানিকগঞ্জ', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.8617, lng: 90.0003, cadets: 180, blackspots: 9, risk: 'Medium', coordinator: 'Zakir Hossain', phone: '+880 1716-889900' },
    { code: 'munshiganj', name: 'Munshiganj', nameBn: 'মুন্সীগঞ্জ', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.5422, lng: 90.5305, cadets: 160, blackspots: 6, risk: 'Low', coordinator: 'Kawsar Mahmud', phone: '+880 1717-990011' },
    { code: 'narsingdi', name: 'Narsingdi', nameBn: 'নরসিংদী', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.9322, lng: 90.7151, cadets: 220, blackspots: 12, risk: 'Medium', coordinator: 'Asaduzzaman Nur', phone: '+880 1718-112233' },
    { code: 'faridpur', name: 'Faridpur', nameBn: 'ফরিদপুর', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.6070, lng: 89.8429, cadets: 210, blackspots: 8, risk: 'Low', coordinator: 'Sabbir Ahmed', phone: '+880 1719-223344' },
    { code: 'gopalganj', name: 'Gopalganj', nameBn: 'গোপালগঞ্জ', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.0050, lng: 89.8266, cadets: 140, blackspots: 5, risk: 'Low', coordinator: 'Mahbubur Rahman', phone: '+880 1720-334455' },
    { code: 'madaripur', name: 'Madaripur', nameBn: 'মাদারীপুর', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.1641, lng: 90.1897, cadets: 130, blackspots: 6, risk: 'Low', coordinator: 'Rashedul Islam', phone: '+880 1721-445566' },
    { code: 'rajbari', name: 'Rajbari', nameBn: 'রাজবাড়ী', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.7574, lng: 89.6445, cadets: 110, blackspots: 4, risk: 'Low', coordinator: 'Sultan Mahmud', phone: '+880 1722-556677' },
    { code: 'shariatpur', name: 'Shariatpur', nameBn: 'শরীয়তপুর', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.2423, lng: 90.4348, cadets: 120, blackspots: 5, risk: 'Low', coordinator: 'Ariful Islam', phone: '+880 1723-667788' },

    // Chattogram Division (11)
    { code: 'chattogram', name: 'Chattogram', nameBn: 'চট্টগ্রাম', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 22.3569, lng: 91.7832, cadets: 720, blackspots: 24, risk: 'High', coordinator: 'Naimur Rahman Chowdhury', phone: '+880 1730-112233' },
    { code: 'coxs_bazar', name: "Cox's Bazar", nameBn: 'কক্সবাজার', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 21.4272, lng: 92.0058, cadets: 340, blackspots: 15, risk: 'High', coordinator: 'Zubair Hossain', phone: '+880 1731-223344' },
    { code: 'comilla', name: 'Cumilla', nameBn: 'কুমিল্লা', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 23.4607, lng: 91.1809, cadets: 410, blackspots: 16, risk: 'High', coordinator: 'Ibrahim Khalil', phone: '+880 1732-334455' },
    { code: 'feni', name: 'Feni', nameBn: 'ফেনী', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 23.0101, lng: 91.3976, cadets: 190, blackspots: 8, risk: 'Medium', coordinator: 'Kamrul Hasan', phone: '+880 1733-445566' },
    { code: 'brahmanbaria', name: 'Brahmanbaria', nameBn: 'ব্রাহ্মণবাড়িয়া', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 23.9571, lng: 91.1115, cadets: 230, blackspots: 10, risk: 'Medium', coordinator: 'Nazmul Huda', phone: '+880 1734-556677' },
    { code: 'chandpur', name: 'Chandpur', nameBn: 'চাঁদপুর', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 23.2333, lng: 90.6712, cadets: 170, blackspots: 6, risk: 'Low', coordinator: 'Saidur Rahman', phone: '+880 1735-667788' },
    { code: 'lakshmipur', name: 'Lakshmipur', nameBn: 'লক্ষ্মীপুর', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 22.9447, lng: 90.8282, cadets: 140, blackspots: 5, risk: 'Low', coordinator: 'Mizanur Rahman', phone: '+880 1736-778899' },
    { code: 'noakhali', name: 'Noakhali', nameBn: 'নোয়াখালী', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 22.8696, lng: 91.0995, cadets: 210, blackspots: 7, risk: 'Low', coordinator: 'Shahadat Hossain', phone: '+880 1737-889900' },
    { code: 'rangamati', name: 'Rangamati', nameBn: 'রাঙ্গামাটি', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 22.7324, lng: 92.2985, cadets: 110, blackspots: 6, risk: 'Low', coordinator: 'Ching Mong Marma', phone: '+880 1738-990011' },
    { code: 'khagrachhari', name: 'Khagrachhari', nameBn: 'খাগড়াছড়ি', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 23.1193, lng: 91.9847, cadets: 90, blackspots: 4, risk: 'Low', coordinator: 'Aong Shwe Prue', phone: '+880 1739-112233' },
    { code: 'bandarban', name: 'Bandarban', nameBn: 'বান্দরবান', division: 'Chittagong', divisionBn: 'চট্টগ্রাম', lat: 22.1953, lng: 92.2184, cadets: 80, blackspots: 3, risk: 'Low', coordinator: 'Moung Nu Prue', phone: '+880 1740-223344' },

    // Rajshahi Division (8)
    { code: 'rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 24.3745, lng: 88.6042, cadets: 460, blackspots: 14, risk: 'Medium', coordinator: 'Mahmudul Hasan', phone: '+880 1741-334455' },
    { code: 'bogura', name: 'Bogura', nameBn: 'বগুড়া', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 24.8465, lng: 89.3773, cadets: 390, blackspots: 16, risk: 'High', coordinator: 'Rezaul Karim', phone: '+880 1742-445566' },
    { code: 'pabna', name: 'Pabna', nameBn: 'পাবনা', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 24.0064, lng: 89.2372, cadets: 240, blackspots: 9, risk: 'Medium', coordinator: 'Harun-ur-Rashid', phone: '+880 1743-556677' },
    { code: 'sirajganj', name: 'Sirajganj', nameBn: 'সিরাজগঞ্জ', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 24.4533, lng: 89.7007, cadets: 320, blackspots: 18, risk: 'High', coordinator: 'Abul Kalam Azad', phone: '+880 1744-667788' },
    { code: 'natore', name: 'Natore', nameBn: 'নাটোর', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 24.4206, lng: 89.0000, cadets: 170, blackspots: 8, risk: 'Medium', coordinator: 'Shafiqul Islam', phone: '+880 1745-778899' },
    { code: 'naogaon', name: 'Naogaon', nameBn: 'নওগাঁ', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 24.7936, lng: 88.9318, cadets: 180, blackspots: 6, risk: 'Low', coordinator: 'Jahangir Alam', phone: '+880 1746-889900' },
    { code: 'chapainawabganj', name: 'Chapainawabganj', nameBn: 'চাঁপাইনবাবগঞ্জ', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 24.5965, lng: 88.2776, cadets: 140, blackspots: 5, risk: 'Low', coordinator: 'Motiur Rahman', phone: '+880 1747-990011' },
    { code: 'joypurhat', name: 'Joypurhat', nameBn: 'জয়পুরহাট', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 25.0968, lng: 89.0227, cadets: 110, blackspots: 4, risk: 'Low', coordinator: 'Golam Rabbani', phone: '+880 1748-112233' },

    // Khulna Division (10)
    { code: 'khulna', name: 'Khulna', nameBn: 'খুলনা', division: 'Khulna', divisionBn: 'খুলনা', lat: 22.8456, lng: 89.5403, cadets: 430, blackspots: 13, risk: 'Medium', coordinator: 'Kazi Mostafa Kamal', phone: '+880 1750-112233' },
    { code: 'jessore', name: 'Jashore', nameBn: 'যশোর', division: 'Khulna', divisionBn: 'খুলনা', lat: 23.1665, lng: 89.2134, cadets: 310, blackspots: 11, risk: 'Medium', coordinator: 'Asadul Islam', phone: '+880 1751-223344' },
    { code: 'kushtia', name: 'Kushtia', nameBn: 'কুষ্টিয়া', division: 'Khulna', divisionBn: 'খুলনা', lat: 23.9013, lng: 89.1200, cadets: 210, blackspots: 8, risk: 'Medium', coordinator: 'Enamul Haque', phone: '+880 1752-334455' },
    { code: 'jhenaidah', name: 'Jhenaidah', nameBn: 'ঝিনাইদহ', division: 'Khulna', divisionBn: 'খুলনা', lat: 23.5448, lng: 89.1539, cadets: 160, blackspots: 6, risk: 'Low', coordinator: 'Nasir Uddin', phone: '+880 1753-445566' },
    { code: 'satkhira', name: 'Satkhira', nameBn: 'সাতক্ষীরা', division: 'Khulna', divisionBn: 'খুলনা', lat: 22.7185, lng: 89.0705, cadets: 170, blackspots: 5, risk: 'Low', coordinator: 'Moniruzzaman', phone: '+880 1754-556677' },
    { code: 'bagerhat', name: 'Bagerhat', nameBn: 'বাগেরহাট', division: 'Khulna', divisionBn: 'খুলনা', lat: 22.6510, lng: 89.7897, cadets: 140, blackspots: 4, risk: 'Low', coordinator: 'Shahidul Islam', phone: '+880 1755-667788' },
    { code: 'chuadanga', name: 'Chuadanga', nameBn: 'চুয়াডাঙ্গা', division: 'Khulna', divisionBn: 'খুলনা', lat: 23.6401, lng: 88.8419, cadets: 120, blackspots: 5, risk: 'Low', coordinator: 'Tariqul Islam', phone: '+880 1756-778899' },
    { code: 'magura', name: 'Magura', nameBn: 'মাগুরা', division: 'Khulna', divisionBn: 'খুলনা', lat: 23.4872, lng: 89.4195, cadets: 130, blackspots: 4, risk: 'Low', coordinator: 'Lutfar Rahman', phone: '+880 1757-889900' },
    { code: 'meherpur', name: 'Meherpur', nameBn: 'মেহেরপুর', division: 'Khulna', divisionBn: 'খুলনা', lat: 23.7622, lng: 88.6319, cadets: 90, blackspots: 3, risk: 'Low', coordinator: 'Habibur Rahman', phone: '+880 1758-990011' },
    { code: 'narail', name: 'Narail', nameBn: 'নড়াইল', division: 'Khulna', divisionBn: 'খুলনা', lat: 23.1725, lng: 89.5120, cadets: 100, blackspots: 3, risk: 'Low', coordinator: 'Shariful Islam', phone: '+880 1759-112233' },

    // Barisal Division (6)
    { code: 'barisal', name: 'Barishal', nameBn: 'বরিশাল', division: 'Barisal', divisionBn: 'বরিশাল', lat: 22.7010, lng: 90.3535, cadets: 310, blackspots: 9, risk: 'Medium', coordinator: 'Dr. Rafiqul Islam', phone: '+880 1760-112233' },
    { code: 'patuakhali', name: 'Patuakhali', nameBn: 'পটুয়াখালী', division: 'Barisal', divisionBn: 'বরিশাল', lat: 22.3596, lng: 90.3290, cadets: 160, blackspots: 5, risk: 'Low', coordinator: 'Aminul Islam', phone: '+880 1761-223344' },
    { code: 'bhola', name: 'Bhola', nameBn: 'ভোলা', division: 'Barisal', divisionBn: 'বরিশাল', lat: 22.6859, lng: 90.6482, cadets: 150, blackspots: 4, risk: 'Low', coordinator: 'Zillur Rahman', phone: '+880 1762-334455' },
    { code: 'pirojpur', name: 'Pirojpur', nameBn: 'পিরোজপুর', division: 'Barisal', divisionBn: 'বরিশাল', lat: 22.5791, lng: 89.9759, cadets: 120, blackspots: 4, risk: 'Low', coordinator: 'Kamal Hossain', phone: '+880 1763-445566' },
    { code: 'barguna', name: 'Barguna', nameBn: 'বরগুনা', division: 'Barisal', divisionBn: 'বরিশাল', lat: 22.1510, lng: 90.1266, cadets: 110, blackspots: 3, risk: 'Low', coordinator: 'Mosharraf Hossain', phone: '+880 1764-556677' },
    { code: 'jhalokati', name: 'Jhalokati', nameBn: 'ঝালকাঠি', division: 'Barisal', divisionBn: 'বরিশাল', lat: 22.6406, lng: 90.1987, cadets: 95, blackspots: 3, risk: 'Low', coordinator: 'Bazlur Rahman', phone: '+880 1765-667788' },

    // Sylhet Division (4)
    { code: 'sylhet', name: 'Sylhet', nameBn: 'সিলেট', division: 'Sylhet', divisionBn: 'সিলেট', lat: 24.8949, lng: 91.8687, cadets: 390, blackspots: 14, risk: 'Medium', coordinator: 'Syed Mujtaba Ali', phone: '+880 1770-112233' },
    { code: 'moulvibazar', name: 'Moulvibazar', nameBn: 'মৌলভীবাজার', division: 'Sylhet', divisionBn: 'সিলেট', lat: 24.4829, lng: 91.7774, cadets: 190, blackspots: 7, risk: 'Medium', coordinator: 'Faruk Ahmed', phone: '+880 1771-223344' },
    { code: 'habiganj', name: 'Habiganj', nameBn: 'হবিগঞ্জ', division: 'Sylhet', divisionBn: 'সিলেট', lat: 24.3749, lng: 91.4155, cadets: 210, blackspots: 9, risk: 'Medium', coordinator: 'Babul Mia', phone: '+880 1772-334455' },
    { code: 'sunamganj', name: 'Sunamganj', nameBn: 'সুনামগঞ্জ', division: 'Sylhet', divisionBn: 'সিলেট', lat: 25.0657, lng: 91.3950, cadets: 150, blackspots: 5, risk: 'Low', coordinator: 'Dewan Shafiul Alam', phone: '+880 1773-445566' },

    // Rangpur Division (8)
    { code: 'rangpur', name: 'Rangpur', nameBn: 'রংপুর', division: 'Rangpur', divisionBn: 'রংপুর', lat: 25.7439, lng: 89.2752, cadets: 350, blackspots: 12, risk: 'Medium', coordinator: 'Nurul Islam', phone: '+880 1780-112233' },
    { code: 'dinajpur', name: 'Dinajpur', nameBn: 'দিনাজপুর', division: 'Rangpur', divisionBn: 'রংপুর', lat: 25.6279, lng: 88.6332, cadets: 230, blackspots: 8, risk: 'Medium', coordinator: 'Akramul Haque', phone: '+880 1781-223344' },
    { code: 'kurigram', name: 'Kurigram', nameBn: 'কুড়িগ্রাম', division: 'Rangpur', divisionBn: 'রংপুর', lat: 25.8072, lng: 89.6295, cadets: 160, blackspots: 5, risk: 'Low', coordinator: 'Mozammel Hossain', phone: '+880 1782-334455' },
    { code: 'gaibandha', name: 'Gaibandha', nameBn: 'গাইবান্ধা', division: 'Rangpur', divisionBn: 'রংপুর', lat: 25.3288, lng: 89.5286, cadets: 170, blackspots: 6, risk: 'Low', coordinator: 'Shoriful Islam', phone: '+880 1783-445566' },
    { code: 'nilphamari', name: 'Nilphamari', nameBn: 'নীলফামারী', division: 'Rangpur', divisionBn: 'রংপুর', lat: 25.9310, lng: 88.8560, cadets: 140, blackspots: 4, risk: 'Low', coordinator: 'Anwar Hossain', phone: '+880 1784-556677' },
    { code: 'thakurgaon', name: 'Thakurgaon', nameBn: 'ঠাকুরগাঁও', division: 'Rangpur', divisionBn: 'রংপুর', lat: 26.0336, lng: 88.4616, cadets: 130, blackspots: 4, risk: 'Low', coordinator: 'Mansur Rahman', phone: '+880 1785-667788' },
    { code: 'panchagarh', name: 'Panchagarh', nameBn: 'পঞ্চগড়', division: 'Rangpur', divisionBn: 'রংপুর', lat: 26.3411, lng: 88.5542, cadets: 110, blackspots: 3, risk: 'Low', coordinator: 'Ruhul Amin', phone: '+880 1786-778899' },
    { code: 'lalmonirhat', name: 'Lalmonirhat', nameBn: 'লালমনিরহাট', division: 'Rangpur', divisionBn: 'রংপুর', lat: 25.9923, lng: 89.2847, cadets: 100, blackspots: 3, risk: 'Low', coordinator: 'Sirajul Islam', phone: '+880 1787-889900' },

    // Mymensingh Division (4)
    { code: 'mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ', division: 'Mymensingh', divisionBn: 'ময়মনসিংহ', lat: 24.7471, lng: 90.4203, cadets: 360, blackspots: 14, risk: 'High', coordinator: 'Prof. Mustafizur Rahman', phone: '+880 1790-112233' },
    { code: 'jamalpur', name: 'Jamalpur', nameBn: 'জামালপুর', division: 'Mymensingh', divisionBn: 'ময়মনসিংহ', lat: 24.9375, lng: 89.9376, cadets: 190, blackspots: 7, risk: 'Medium', coordinator: 'Mokhlesur Rahman', phone: '+880 1791-223344' },
    { code: 'netrokona', name: 'Netrokona', nameBn: 'নেত্রকোনা', division: 'Mymensingh', divisionBn: 'ময়মনসিংহ', lat: 24.8704, lng: 90.7279, cadets: 150, blackspots: 5, risk: 'Low', coordinator: 'Delwar Hossain', phone: '+880 1792-334455' },
    { code: 'sherpur', name: 'Sherpur', nameBn: 'শেরপুর', division: 'Mymensingh', divisionBn: 'ময়মনসিংহ', lat: 25.0204, lng: 90.0170, cadets: 120, blackspots: 4, risk: 'Low', coordinator: 'Harun Rashid', phone: '+880 1793-445566' },
];

const DIVISION_THEMES = {
    'Dhaka': { color: '#f59e0b', nameBn: 'ঢাকা', bg: 'rgba(245, 158, 11, 0.16)', border: '#f59e0b' },
    'Chittagong': { color: '#38bdf8', nameBn: 'চট্টগ্রাম', bg: 'rgba(56, 189, 248, 0.16)', border: '#38bdf8' },
    'Rajshahi': { color: '#22c55e', nameBn: 'রাজশাহী', bg: 'rgba(34, 197, 94, 0.16)', border: '#22c55e' },
    'Khulna': { color: '#a855f7', nameBn: 'খুলনা', bg: 'rgba(168, 85, 247, 0.16)', border: '#a855f7' },
    'Barisal': { color: '#ec4899', nameBn: 'বরিশাল', bg: 'rgba(236, 72, 153, 0.16)', border: '#ec4899' },
    'Sylhet': { color: '#06b6d4', nameBn: 'সিলেট', bg: 'rgba(6, 182, 212, 0.16)', border: '#06b6d4' },
    'Rangpur': { color: '#eab308', nameBn: 'রংপুর', bg: 'rgba(234, 179, 8, 0.16)', border: '#eab308' },
    'Mymensingh': { color: '#10b981', nameBn: 'ময়মনসিংহ', bg: 'rgba(16, 185, 129, 0.16)', border: '#10b981' },
};

// Coordinate projection helper: maps lat/lng into SVG 800x960 canvas accurately
function project(lat, lng) {
    const minLat = 20.4, maxLat = 26.8;
    const minLng = 88.0, maxLng = 92.8;
    const x = ((lng - minLng) / (maxLng - minLng)) * 700 + 50;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 840 + 50;
    return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

// Major National Highway Corridors across Bangladesh
const HIGHWAY_CORRIDORS = [
    { id: 'N1', name: 'N1 Dhaka–Chattogram–Cox Expressway', path: 'dhaka,narayanganj,comilla,feni,chattogram,coxs_bazar', color: '#f59e0b' },
    { id: 'N2', name: 'N2 Dhaka–Sylhet Economic Highway', path: 'dhaka,narsingdi,brahmanbaria,habiganj,moulvibazar,sylhet', color: '#38bdf8' },
    { id: 'N3', name: 'N3 Dhaka–Mymensingh Industrial Axis', path: 'dhaka,gazipur,mymensingh', color: '#10b981' },
    { id: 'N5', name: 'N5 Dhaka–Sirajganj–Bogura–Rangpur Corridor', path: 'dhaka,manikganj,tangail,sirajganj,bogura,rangpur,dinajpur,panchagarh', color: '#eab308' },
    { id: 'N8', name: 'N8 Dhaka–Padma Bridge–Barishal–Kuakata', path: 'dhaka,munshiganj,madaripur,barisal,patuakhali', color: '#ec4899' },
    { id: 'N7', name: 'N7 Daulatdia–Faridpur–Jashore–Khulna', path: 'rajbari,faridpur,magura,jessore,khulna', color: '#a855f7' },
];

/* ═══════════════════════════════════════════════════════════════════════
   AUTHENTIC 2D GEOGRAPHICAL PATHS — Official BBS & geoBoundaries Geometries
   ═══════════════════════════════════════════════════════════════════════ */
// Outer sovereign border accurately plotted directly from BBS / geoBoundaries ADM0
const BANGLADESH_SHAPE_PATH = bdOutlineData.outline;

// Bangladesh 8 administrative divisions official BBS / geoBoundaries ADM1 boundary paths
const DIVISION_REGIONS = [
    { id: 'Rangpur', nameBn: 'রংপুর', color: '#eab308', path: bdDivisionsData['Rangpur'] || '' },
    { id: 'Rajshahi', nameBn: 'রাজশাহী', color: '#22c55e', path: bdDivisionsData['Rajshahi'] || '' },
    { id: 'Mymensingh', nameBn: 'ময়মনসিংহ', color: '#10b981', path: bdDivisionsData['Mymensingh'] || '' },
    { id: 'Sylhet', nameBn: 'সিলেট', color: '#06b6d4', path: bdDivisionsData['Sylhet'] || '' },
    { id: 'Dhaka', nameBn: 'ঢাকা', color: '#f59e0b', path: bdDivisionsData['Dhaka'] || '' },
    { id: 'Khulna', nameBn: 'খুলনা', color: '#a855f7', path: bdDivisionsData['Khulna'] || '' },
    { id: 'Barisal', nameBn: 'বরিশাল', color: '#ec4899', path: bdDivisionsData['Barisal'] || '' },
    { id: 'Chittagong', nameBn: 'চট্টগ্রাম', color: '#38bdf8', path: bdDivisionsData['Chittagong'] || '' },
];

// Principal river systems defining the Bengal delta
const RIVERS = [
    { name: 'Padma', path: 'M 115 375 C 180 395, 260 415, 330 450 C 365 470, 410 495, 460 520' },
    { name: 'Jamuna', path: 'M 285 140 C 295 210, 290 280, 275 350 C 270 380, 290 410, 330 450' },
    { name: 'Meghna', path: 'M 520 340 C 490 380, 480 430, 470 480 C 460 520, 475 580, 485 640 C 490 690, 480 740, 450 780' },
    { name: 'Karnaphuli', path: 'M 690 620 C 660 635, 625 640, 580 655' },
];

export default function BangladeshGlobe() {
    const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0]); // Default Dhaka
    const [activeDivision, setActiveDivision] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredDistrict, setHoveredDistrict] = useState(null);
    const [showCorridors, setShowCorridors] = useState(true);

    // Filter districts
    const filteredDistricts = useMemo(() => {
        return DISTRICTS.filter((d) => {
            const matchesDiv = activeDivision === 'All' || d.division === activeDivision;
            const matchesSearch =
                !searchQuery ||
                d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.nameBn.includes(searchQuery);
            return matchesDiv && matchesSearch;
        });
    }, [activeDivision, searchQuery]);

    // Aggregate statistics
    const stats = useMemo(() => {
        const totalCadets = DISTRICTS.reduce((acc, d) => acc + d.cadets, 0);
        const totalBlackspots = DISTRICTS.reduce((acc, d) => acc + d.blackspots, 0);
        const highRiskCount = DISTRICTS.filter((d) => d.risk === 'High').length;
        return { totalCadets, totalBlackspots, highRiskCount };
    }, []);

    // Build SVG path lines for highways
    const highwayLines = useMemo(() => {
        const districtLookup = Object.fromEntries(DISTRICTS.map((d) => [d.code, d]));
        return HIGHWAY_CORRIDORS.map((hwy) => {
            const points = hwy.path
                .split(',')
                .map((code) => districtLookup[code.trim()])
                .filter(Boolean)
                .map((d) => project(d.lat, d.lng));

            if (points.length < 2) return null;
            const dStr = points.reduce((acc, pt, idx) => {
                return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
            }, '');

            return { ...hwy, dStr };
        }).filter(Boolean);
    }, []);

    return (
        <div id="district-map" className="w-full max-w-full overflow-hidden py-14 sm:py-20 bg-slate-950 text-white relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 relative z-10 w-full max-w-full overflow-hidden">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-xs font-black uppercase tracking-wider text-amber-400">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span>Real Geographical 2D Map · 64 Districts Command</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                        Bangladesh Vision Zero Network
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Interactive GIS command center visualizing all 64 district chapters, 8 divisions, major highway corridors (N1–N8),
                        and active volunteer roadside patrols fighting to eliminate preventable road crash casualties.
                    </p>
                </div>

                {/* Division Filter Pills & Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-xl w-full max-w-full overflow-hidden">
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                        <button
                            type="button"
                            onClick={() => setActiveDivision('All')}
                            className={`px-3.5 py-2 rounded-xl text-xs font-black transition shrink-0 ${
                                activeDivision === 'All'
                                    ? 'bg-amber-400 text-slate-950 shadow-md'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            All 64 Districts
                        </button>
                        {Object.entries(DIVISION_THEMES).map(([divName, theme]) => {
                            const isSelected = activeDivision === divName;
                            return (
                                <button
                                    key={divName}
                                    type="button"
                                    onClick={() => setActiveDivision(divName)}
                                    className={`px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
                                        isSelected
                                            ? 'text-slate-950 font-black shadow-md'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                    }`}
                                    style={isSelected ? { background: theme.color } : {}}
                                >
                                    <span className="w-2 h-2 rounded-full" style={{ background: theme.color }} />
                                    <span>{divName} ({theme.nameBn})</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                        <div className="relative flex-1 sm:w-64">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search 64 districts (EN / বাংলা)..."
                                className="w-full px-3.5 py-2 pl-8 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-bold"
                            />
                            <span className="absolute left-2.5 top-2.5 text-slate-500 text-xs">🔍</span>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowCorridors(!showCorridors)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1 border shrink-0 ${
                                showCorridors
                                    ? 'bg-amber-400 text-slate-950 border-amber-500'
                                    : 'bg-slate-950 text-slate-300 border-slate-700'
                            }`}
                        >
                            <span>🛣️ Highways</span>
                        </button>
                    </div>
                </div>

                {/* Main Interactive Grid (Vector Map + District Dossier) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full max-w-full overflow-hidden">
                    {/* SVG Vector Map Canvas (7 cols on desktop) */}
                    <div className="lg:col-span-7 bg-slate-950/95 rounded-3xl border-2 border-slate-800 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
                        {/* Top corner map badges */}
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-mono text-slate-300 font-bold">
                                GPS 20.4°N — 26.8°N · 88.0°E — 92.8°E
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                                ● 64 Nodes Online
                            </span>
                        </div>

                        <div className="absolute top-4 right-4 z-20">
                            <div className="text-[10px] text-amber-400 font-mono font-bold bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700">
                                {filteredDistricts.length} / 64 Districts
                            </div>
                        </div>

                        {/* Interactive Real 2D SVG Canvas */}
                        <div className="relative w-full aspect-[800/960] max-h-[720px] mx-auto select-none">
                            <svg
                                viewBox="0 0 800 960"
                                className="w-full h-full select-none"
                                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' }}
                            >
                                <defs>
                                    {/* Gradients and Filters */}
                                    <radialGradient id="deltaGlow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
                                        <stop offset="60%" stopColor="#0284c7" stopOpacity="0.05" />
                                        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                                    </radialGradient>
                                    <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                                    </filter>
                                </defs>

                                {/* Ambient Delta Glow */}
                                <circle cx="400" cy="480" r="390" fill="url(#deltaGlow)" />

                                {/* Bay of Bengal Ocean Waves Indicator in the South */}
                                <g opacity="0.4">
                                    <path d="M 120 840 Q 220 820, 320 840 T 520 840 T 720 840" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 6" />
                                    <path d="M 100 870 Q 200 850, 300 870 T 500 870 T 700 870" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 6" />
                                    <path d="M 140 900 Q 240 880, 340 900 T 540 900 T 740 900" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 6" />
                                    <text x="350" y="885" fill="#38bdf8" fontSize="12" fontWeight="800" fontFamily="system-ui" opacity="0.6" letterSpacing="4">
                                        BAY OF BENGAL (বঙ্গোপসাগর)
                                    </text>
                                </g>

                                {/* Authentic 8 Administrative Division Boundary Fills */}
                                {DIVISION_REGIONS.map((div) => {
                                    const isDivActive = activeDivision === 'All' || activeDivision === div.id;
                                    const isDivSelected = activeDivision === div.id;
                                    return (
                                        <path
                                            key={div.id}
                                            d={div.path}
                                            fill={div.color}
                                            fillOpacity={isDivSelected ? 0.28 : isDivActive ? 0.08 : 0.02}
                                            stroke={div.color}
                                            strokeWidth={isDivSelected ? 2.5 : 1}
                                            strokeOpacity={isDivActive ? 0.5 : 0.15}
                                            className="transition-all duration-300"
                                        />
                                    );
                                })}

                                {/* Authentic 64 District Geographic Polygons from Official BBS/geoBoundaries */}
                                <g id="district-boundaries">
                                    {DISTRICTS.map((d) => {
                                        const dPath = bdDistrictsData.paths[d.name] || bdDistrictsData.paths[d.code];
                                        if (!dPath) return null;
                                        const isSelected = selectedDistrict?.code === d.code;
                                        const isHovered = hoveredDistrict?.code === d.code;
                                        const isMatch = filteredDistricts.some((fd) => fd.code === d.code);
                                        const theme = DIVISION_THEMES[d.division] || { color: '#f59e0b' };

                                        return (
                                            <path
                                                key={`poly-${d.code}`}
                                                d={dPath}
                                                fill={isSelected ? theme.color : isHovered ? theme.color : 'transparent'}
                                                fillOpacity={isSelected ? 0.35 : isHovered ? 0.2 : 0}
                                                stroke={isSelected ? theme.color : isHovered ? theme.color : isMatch ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)'}
                                                strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0.6}
                                                onClick={() => setSelectedDistrict(d)}
                                                onMouseEnter={() => setHoveredDistrict(d)}
                                                onMouseLeave={() => setHoveredDistrict(null)}
                                                className="cursor-pointer transition-colors duration-200"
                                            />
                                        );
                                    })}
                                </g>

                                {/* Master Sovereign Geographical Contour of Bangladesh */}
                                <path
                                    d={BANGLADESH_SHAPE_PATH}
                                    fill="none"
                                    stroke="#f59e0b"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.45))' }}
                                />

                                {/* Major Rivers of Bangladesh (Padma, Jamuna, Meghna, Karnaphuli) */}
                                {RIVERS.map((river, idx) => (
                                    <g key={idx}>
                                        <path
                                            d={river.path}
                                            fill="none"
                                            stroke="#0284c7"
                                            strokeWidth="2.5"
                                            strokeOpacity="0.45"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d={river.path}
                                            fill="none"
                                            stroke="#38bdf8"
                                            strokeWidth="1"
                                            strokeOpacity="0.8"
                                            strokeDasharray="4 4"
                                            strokeLinecap="round"
                                        />
                                    </g>
                                ))}

                                {/* National Highway Corridors */}
                                {showCorridors &&
                                    highwayLines.map((hwy) => (
                                        <g key={hwy.id}>
                                            <path
                                                d={hwy.dStr}
                                                fill="none"
                                                stroke={hwy.color}
                                                strokeWidth="4"
                                                strokeOpacity="0.25"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d={hwy.dStr}
                                                fill="none"
                                                stroke={hwy.color}
                                                strokeWidth="2"
                                                strokeDasharray="8 6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="animate-pulse"
                                            />
                                        </g>
                                    ))}

                                {/* District Nodes (All 64) positioned at authentic geographic centroids */}
                                {DISTRICTS.map((d) => {
                                    const centroid = bdDistrictsData.centroids[d.name] || bdDistrictsData.centroids[d.code];
                                    const { x, y } = centroid ? { x: centroid.x, y: centroid.y } : project(d.lat, d.lng);
                                    const isSelected = selectedDistrict?.code === d.code;
                                    const isHovered = hoveredDistrict?.code === d.code;
                                    const isMatch = filteredDistricts.some((fd) => fd.code === d.code);
                                    const theme = DIVISION_THEMES[d.division] || { color: '#f59e0b' };

                                    const nodeOpacity = isMatch ? 1 : 0.15;
                                    const isHighRisk = d.risk === 'High';

                                    return (
                                        <g
                                            key={d.code}
                                            onClick={() => setSelectedDistrict(d)}
                                            onMouseEnter={() => setHoveredDistrict(d)}
                                            onMouseLeave={() => setHoveredDistrict(null)}
                                            className="cursor-pointer transition-all duration-200"
                                            opacity={nodeOpacity}
                                        >
                                            {/* Radar pulse wave for selected or high-risk node */}
                                            {(isSelected || isHovered || isHighRisk) && (
                                                <circle
                                                    cx={x}
                                                    cy={y}
                                                    r={isSelected ? 18 : isHighRisk ? 12 : 10}
                                                    fill="none"
                                                    stroke={isHighRisk ? '#ef4444' : theme.color}
                                                    strokeWidth={isSelected ? '2' : '1.5'}
                                                    strokeOpacity="0.7"
                                                    className="animate-ping"
                                                    style={{ transformOrigin: `${x}px ${y}px`, animationDuration: isSelected ? '1.8s' : '3s' }}
                                                />
                                            )}

                                            {/* Outer halo circle */}
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r={isSelected ? 9 : isHovered ? 7 : 5}
                                                fill={theme.color}
                                                fillOpacity={isSelected ? 0.5 : 0.25}
                                                stroke={isSelected ? '#ffffff' : theme.color}
                                                strokeWidth={isSelected ? 2 : 1}
                                            />

                                            {/* Core center beacon */}
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r={isSelected ? 5 : 3.5}
                                                fill={isHighRisk ? '#ef4444' : isSelected ? '#ffffff' : theme.color}
                                            />

                                            {/* District Name Label */}
                                            <text
                                                x={x}
                                                y={y - 8}
                                                textAnchor="middle"
                                                fill={isSelected ? '#f59e0b' : isHovered ? '#ffffff' : '#cbd5e1'}
                                                fontSize={isSelected ? '12' : isHovered ? '11' : '9'}
                                                fontWeight={isSelected || isHovered ? '900' : '700'}
                                                fontFamily="system-ui"
                                                className="pointer-events-none select-none transition-all duration-150"
                                                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.95)' }}
                                            >
                                                {d.name}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>

                        {/* Interactive Highway Legend Bar */}
                        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
                            <div className="flex items-center gap-3 flex-wrap font-mono font-bold">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-3 h-1.5 rounded bg-amber-400" />
                                    <span>N1 (Chattogram)</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-3 h-1.5 rounded bg-sky-400" />
                                    <span>N2 (Sylhet)</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-3 h-1.5 rounded bg-yellow-400" />
                                    <span>N5 (North Bengal)</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-3 h-1.5 rounded bg-pink-400" />
                                    <span>N8 (Padma/South)</span>
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                                <span className="text-rose-300 font-bold">High Risk Crash Corridor</span>
                            </div>
                        </div>
                    </div>

                    {/* District Command Dossier & Action Panel (5 cols on desktop) */}
                    <div className="lg:col-span-5 space-y-4 w-full max-w-full overflow-hidden">
                        <AnimatePresence mode="wait">
                            {selectedDistrict && (
                                <motion.div
                                    key={selectedDistrict.code}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.25 }}
                                    className="bg-slate-950/95 rounded-3xl border-2 border-slate-800 p-6 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-md"
                                >
                                    {/* Top ambient banner glow */}
                                    <div
                                        className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-2xl pointer-events-none opacity-40"
                                        style={{ background: DIVISION_THEMES[selectedDistrict.division]?.color || '#f59e0b' }}
                                    />

                                    {/* Dossier Header */}
                                    <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
                                                    style={{
                                                        background: DIVISION_THEMES[selectedDistrict.division]?.bg || 'rgba(245, 158, 11, 0.2)',
                                                        color: DIVISION_THEMES[selectedDistrict.division]?.color || '#f59e0b',
                                                        border: `1.5px solid ${DIVISION_THEMES[selectedDistrict.division]?.border || 'transparent'}`,
                                                    }}
                                                >
                                                    {selectedDistrict.division} Division ({selectedDistrict.divisionBn})
                                                </span>

                                                <span
                                                    className={`px-2.5 py-1 rounded-md text-[10px] font-black font-mono ${
                                                        selectedDistrict.risk === 'High'
                                                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                                            : selectedDistrict.risk === 'Medium'
                                                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                                    }`}
                                                >
                                                    {selectedDistrict.risk} Priority Blackspots
                                                </span>
                                            </div>

                                            <h3 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-2">
                                                <span>{selectedDistrict.name}</span>
                                                <span className="text-2xl text-amber-400 font-bangla font-black">
                                                    ({selectedDistrict.nameBn})
                                                </span>
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-1">
                                                District Chapter: <strong className="font-mono text-amber-400 uppercase font-black">{selectedDistrict.code}</strong> · Active Roadside Command
                                            </p>
                                        </div>

                                        <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-3xl shadow-inner shrink-0">
                                            🛡️
                                        </div>
                                    </div>

                                    {/* Real-time Field Metrics */}
                                    <div className="grid grid-cols-2 gap-3.5">
                                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                                            <div className="text-xs text-slate-400 font-black uppercase tracking-wider">
                                                Volunteer Cadets
                                            </div>
                                            <div className="text-3xl font-black text-amber-400 mt-1">
                                                {selectedDistrict.cadets}
                                            </div>
                                            <div className="text-[10px] text-slate-500 mt-0.5 font-bold">
                                                Trained First Responders
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                                            <div className="text-xs text-slate-400 font-black uppercase tracking-wider">
                                                Audited Blackspots
                                            </div>
                                            <div className="text-3xl font-black text-rose-400 mt-1">
                                                {selectedDistrict.blackspots}
                                            </div>
                                            <div className="text-[10px] text-slate-500 mt-0.5 font-bold">
                                                High-Crash Highway Curves
                                            </div>
                                        </div>
                                    </div>

                                    {/* Operational Details */}
                                    <div className="space-y-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400 font-bold">Chapter Readiness:</span>
                                            <span className="text-emerald-400 font-black flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                                Active Field Command
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400 font-bold">District Coordinator:</span>
                                            <span className="text-white font-black">{selectedDistrict.coordinator}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400 font-bold">Emergency Hotline:</span>
                                            <a href={`tel:${selectedDistrict.phone}`} className="text-amber-400 font-mono hover:underline font-black">
                                                {selectedDistrict.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400 font-bold">Trauma Response:</span>
                                            <span className="text-slate-200 font-bold">Patrols & Ambulance Dispatch Active</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-2.5 pt-2">
                                        <Link
                                            href={`/register?district=${selectedDistrict.code}&role=volunteer-cadet`}
                                            className="w-full py-4 px-5 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group border border-amber-600"
                                        >
                                            <span>Join Roadside Patrol in {selectedDistrict.name}</span>
                                            <span className="font-mono transition-transform group-hover:translate-x-1">→</span>
                                        </Link>

                                        <div className="grid grid-cols-2 gap-2">
                                            <Link
                                                href={`/districts?select=${selectedDistrict.code}`}
                                                className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-black text-center transition"
                                            >
                                                Full District Profile ↗
                                            </Link>
                                            <Link
                                                href="/courses"
                                                className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-black text-center transition"
                                            >
                                                Cadet Academy 📚
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Quick District Grid selector for current division */}
                        <div className="bg-slate-950/80 p-4 rounded-3xl border border-slate-800 space-y-2.5">
                            <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                                <span>Districts in {activeDivision === 'All' ? 'Bangladesh' : activeDivision}</span>
                                <span className="font-mono text-amber-400 font-black">({filteredDistricts.length})</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1 scrollbar-thin">
                                {filteredDistricts.map((d) => (
                                    <button
                                        key={d.code}
                                        type="button"
                                        onClick={() => setSelectedDistrict(d)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                            selectedDistrict?.code === d.code
                                                ? 'bg-amber-400 text-slate-950 font-black'
                                                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                                        }`}
                                    >
                                        {d.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
