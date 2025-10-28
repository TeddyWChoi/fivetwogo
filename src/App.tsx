import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

// Import local images
import image1 from './assets/trash.jpg';
import image2 from './assets/people.jpg';
import breadfish from './assets/breadfish.jpg';
import logoUrl from './assets/logo.png';
import appScreen1 from './assets/1.jpg';
import appScreen2 from './assets/2.jpg';
import appScreen3 from './assets/3.jpg';
import appScreen4 from './assets/4.jpg';
import appScreen5 from './assets/5.jpg';
import appScreen6 from './assets/6.jpg';
import appScreen7 from './assets/7.jpg';
import appScreen8 from './assets/8.jpg';
import appScreen9 from './assets/9.jpg';
import appScreen10 from './assets/10.jpg';

const appScreenUrls = [
    appScreen1,
    appScreen2,
    appScreen3,
    appScreen4,
    appScreen5,
    appScreen6,
    appScreen7,
    appScreen8,
    appScreen9,
    appScreen10,
];

// Language Types
type Language = 'ko' | 'en';

// Language Toggle Button Component
function LanguageToggle({ currentLang, onToggle }: { currentLang: Language; onToggle: () => void }) {
    return (
        <motion.button
            onClick={onToggle}
            className="z-50 rounded-full shadow-lg flex items-center transition-all duration-300"
            style={{
                border: '1px solid #ecc3c3',
                background: '#fff',
                padding: '5px 20px',
                margin: '10px',
                color: '#717182',
                gap: '5px',
                position: 'absolute',
                top: '0',
                right: '0',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="text-2xl">{currentLang === 'ko' ? '🇰🇷' : '🇬🇧'}</span>
            <span className="font-bold text-lg">{currentLang === 'ko' ? '한국어' : 'English'}</span>
        </motion.button>
    );
}

// Content translations
const translations = {
    ko: {
        hero: {
            subtitle: '오병이어의 기적을 현대에',
            description: '남는 음식을 나눔으로, 배고픈 이웃에게 따뜻한 식사를',
        },
        problem: {
            title: '매일 버려지는\n수많은 음식들',
            highlight: '수많은 음식들',
            stats: [
                { number: '18,000톤', label: '하루 음식물 쓰레기' },
                { number: '300만명', label: '식사를 거르는 사람들' },
                { number: '20조원', label: '연간 음식물 쓰레기 비용' },
            ],
            conclusion:
                '한쪽에서는 음식이 버려지고, 다른 한쪽에서는 끼니를 걱정합니다.\n이 간극을 연결할 수는 없을까요?',
        },
        concept: {
            title: '오병이어의 기적',
            subtitle: '다섯 개의 빵과 두 마리의 물고기로\n수천 명을 먹이신 예수님의 나눔처럼',
            vision: 'FiveTwoGo의 비전',
            visionText:
                '작은 나눔이 모여 큰 변화를 만듭니다.\n당신의 남은 음식 한 끼가 누군가에겐 소중한 한 끼가 됩니다.',
        },
        features: {
            title: '어떻게 작동하나요?',
            features: [
                {
                    title: '실시간 기부 현황',
                    description: '오늘 이루어진 기부를 실시간으로 확인하고, 내 기부가 만든 변화를 직접 봅니다.',
                },
                {
                    title: '간편한 음식 등록',
                    description: '남은 음식을 사진과 함께 간단히 등록하면, 자동으로 라이더가 매칭됩니다.',
                },
                {
                    title: '배달 추적',
                    description: '기부한 음식이 어디로 가는지, 누구에게 전달되는지 실시간으로 추적합니다.',
                },
                {
                    title: '착한 가게 지도',
                    description:
                        '주변의 착한 가게들을 확인하고, CSR 랭킹을 통해 사회적 책임을 실천하는 기업을 응원합니다.',
                },
            ],
        },
        screens: {
            title: '앱 화면 둘러보기',
            hint: '스크롤하여 모든 화면 보기',
            screens: [
                {
                    title: '환영합니다',
                    description: 'FiveTwoGo에 오신 것을 환영합니다. 나눔의 기적을 함께 만들어가요.',
                },
                {
                    title: '실시간 기부 현황',
                    description: '오늘 이루어진 기부를 실시간으로 확인하고, 내 기부가 만든 변화를 직접 봅니다.',
                },
                {
                    title: '간편한 음식 등록',
                    description: '남은 음식을 사진과 함께 간단히 등록하면, 자동으로 라이더가 매칭됩니다.',
                },
                {
                    title: '배달 추적',
                    description: '기부한 음식이 어디로 가는지, 누구에게 전달되는지 실시간으로 추적합니다.',
                },
                {
                    title: '착한 가게 지도',
                    description:
                        '주변의 착한 가게들을 확인하고, CSR 랭킹을 통해 사회적 책임을 실천하는 기업을 응원합니다.',
                },
                {
                    title: '나의 기부 통계',
                    description: '내가 지금까지 기부한 식사 수와 절약한 음식물 쓰레기를 확인하세요.',
                },
                { title: '커뮤니티', description: '다른 사용자들과 나눔 경험을 공유하고 서로 격려하세요.' },
                { title: '랭킹 시스템', description: '가장 많이 기부한 개인과 기업을 확인하고 함께 경쟁하세요.' },
                { title: '착한 가게 지도', description: '내 주변에 어떤 착한 가게들이 있는지 확인해보세요.' },
                { title: '프로필 관리', description: '내 정보를 관리하고 기부 내역을 자세히 살펴보세요.' },
            ],
        },
        impact: {
            title: '우리가 만든 변화',
            stats: [
                { icon: '🍽️', number: '10,000+', label: '누적 기부 식사' },
                { icon: '💚', number: '5,000+', label: '도움받은 사람들' },
                { icon: '🏪', number: '200+', label: '참여 가게' },
                { icon: '🌍', number: '50톤', label: '절감된 음식물 쓰레기' },
            ],
            conclusion: '작은 나눔이 모여 만든 큰 기적.\n당신도 이 변화의 일부가 되어주세요.',
        },
        cta: {
            title: '지금 시작하세요',
            subtitle: 'FiveTwoGo와 함께 나눔의 기적을 경험하세요',
            button: '앱 다운로드',
            stores: ['App Store', 'Google Play'],
        },
        footer: {
            tagline: '오병이어의 기적을 현대에',
        },
    },
    en: {
        hero: {
            subtitle: 'Bringing the Miracle of Five Loaves and Two Fish to Modern Times',
            description: 'Sharing leftover food to provide warm meals to those in need',
        },
        problem: {
            title: 'Food Wasted Daily\nin Huge Quantities',
            highlight: 'Huge Quantities',
            stats: [
                { number: '18,000 tons', label: 'Daily food waste' },
                { number: '3M people', label: 'Missing meals' },
                { number: '20 trillion won', label: 'Annual food waste cost' },
            ],
            conclusion:
                'While food is being wasted on one side, there are people struggling with meals on the other.\nCan we bridge this gap?',
        },
        concept: {
            title: 'The Miracle of Five Loaves',
            subtitle: 'Like Jesus feeding thousands with five loaves and two fish,\nwe share what we have.',
            vision: "FiveTwoGo's Vision",
            visionText:
                "Small acts of sharing create big changes.\nYour leftover meal can become someone's precious meal.",
        },
        features: {
            title: 'How It Works',
            features: [
                {
                    title: 'Real-time Donation Status',
                    description: 'Check real-time donations made today and see the change your donation has created.',
                },
                {
                    title: 'Easy Food Registration',
                    description: 'Register leftover food with photos and automatically get matched with riders.',
                },
                {
                    title: 'Delivery Tracking',
                    description: 'Track in real-time where your donated food goes and who receives it.',
                },
                {
                    title: 'Conscious Store Map',
                    description:
                        'Discover conscious stores nearby and support companies practicing social responsibility through CSR rankings.',
                },
            ],
        },
        screens: {
            title: 'App Tour',
            hint: 'Scroll to view all screens',
            screens: [
                { title: 'Welcome', description: "Welcome to FiveTwoGo. Let's create miracles of sharing together." },
                {
                    title: 'Real-time Donation Status',
                    description: 'Check real-time donations made today and see the change your donation has created.',
                },
                {
                    title: 'Easy Food Registration',
                    description: 'Register leftover food with photos and automatically get matched with riders.',
                },
                {
                    title: 'Delivery Tracking',
                    description: 'Track in real-time where your donated food goes and who receives it.',
                },
                {
                    title: 'Conscious Store Map',
                    description:
                        'Discover conscious stores nearby and support companies practicing social responsibility through CSR rankings.',
                },
                {
                    title: 'My Donation Stats',
                    description: "See how many meals you've donated and how much food waste you've prevented.",
                },
                {
                    title: 'Community',
                    description: 'Share your sharing experiences with other users and encourage each other.',
                },
                {
                    title: 'Ranking System',
                    description: 'Check the most donating individuals and companies and compete together.',
                },
                {
                    title: 'Notifications',
                    description: 'Receive alerts for new donation requests and delivery completions.',
                },
                {
                    title: 'Profile Management',
                    description: 'Manage your information and view your donation history in detail.',
                },
            ],
        },
        impact: {
            title: "The Change We've Made",
            stats: [
                { icon: '🍽️', number: '10,000+', label: 'Donated meals' },
                { icon: '💚', number: '5,000+', label: 'People helped' },
                { icon: '🏪', number: '200+', label: 'Participating stores' },
                { icon: '🌍', number: '50 tons', label: 'Food waste reduced' },
            ],
            conclusion: 'Big miracles made through small acts of sharing.\nBecome part of this change.',
        },
        cta: {
            title: 'Get Started Now',
            subtitle: 'Experience the miracle of sharing with FiveTwoGo',
            button: 'Download App',
            stores: ['App Store', 'Google Play'],
        },
        footer: {
            tagline: 'Bringing the miracle to modern times',
        },
    },
};

// Hero Section Component
function HeroSection({ lang }: { lang: Language }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const t = translations[lang];

    return (
        <motion.section
            ref={ref}
            style={{ opacity, scale, y }}
            className="h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 relative overflow-hidden"
        >
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
            </div>

            <div className="text-center z-10 px-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="mb-8"
                >
                    <img src={logoUrl} alt="FiveTwoGo" className="w-32 h-32 mx-auto rounded-3xl shadow-2xl" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-8xl font-black text-[#e73a40] mb-6 tracking-tight"
                >
                    FiveTwoGo
                </motion.h1>

                <motion.p
                    key={`subtitle-${lang}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl text-gray-700 mb-4"
                >
                    {t.hero.subtitle}
                </motion.p>

                <motion.p
                    key={`description-${lang}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                    {t.hero.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 text-gray-400 animate-bounce"
                >
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </motion.div>
            </div>
        </motion.section>
    );
}

// Problem Section
function ProblemSection({ lang }: { lang: Language }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const t = translations[lang].problem;

    return (
        <section ref={ref} className="min-h-screen bg-white py-32 px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-7xl font-black text-gray-900 mb-16 whitespace-pre-line">
                        {t.title.split('\n')[0]}
                        <br />
                        <span className="text-[#e73a40]">{t.title.split('\n')[1]}</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-3 gap-12 mt-20">
                    {t.stats.map((stat, index) => {
                        // 각 통계에 맞는 이미지
                        const images = [
                            image1,
                            image2,
                            'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=400&fit=crop',
                        ];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
                                className="text-center"
                            >
                                <div className="relative mb-6 flex justify-center">
                                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                                        <img src={images[index]} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="text-6xl font-black text-[#e73a40] mb-4">{stat.number}</div>
                                <div className="text-xl text-gray-600">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-2xl text-gray-600 mt-20 text-center max-w-3xl mx-auto leading-relaxed whitespace-pre-line"
                >
                    {t.conclusion}
                </motion.p>
            </div>
        </section>
    );
}

// Concept Section
function ConceptSection({ lang }: { lang: Language }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const t = translations[lang].concept;

    return (
        <section
            ref={ref}
            className="min-h-screen bg-gradient-to-br from-[#fef2f2] to-[#fff7ed] py-32 px-8 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e73a40] opacity-5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-20"
                >
                    <div className="flex justify-center mb-8">
                        <div
                            className="rounded-full overflow-hidden shadow-xl flex-shrink-0"
                            style={{ width: '200px', height: '200px' }}
                        >
                            <img
                                src={breadfish}
                                alt="Bread and Fish"
                                className="object-cover"
                                style={{ width: '200px', height: '200px' }}
                            />
                        </div>
                    </div>
                    <h2 className="text-7xl font-black text-gray-900 mb-8">{t.title}</h2>
                    <p className="text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                        {t.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="bg-white rounded-3xl p-16 shadow-2xl"
                >
                    <h3 className="text-4xl font-black text-[#e73a40] mb-8 text-center">{t.vision}</h3>
                    <p className="text-2xl text-gray-700 text-center leading-relaxed whitespace-pre-line">
                        {t.visionText}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// App Features Section (removed per request)
function AppFeaturesSection({ lang }: { lang: Language }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const t = translations[lang].features;

    const colors = [
        'from-red-50 to-orange-50',
        'from-orange-50 to-yellow-50',
        'from-yellow-50 to-green-50',
        'from-green-50 to-blue-50',
    ];

    return null;
}

function FeatureCard({
    feature,
    index,
}: {
    feature: { title: string; description: string; color: string };
    index: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`flex items-center gap-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
        >
            <div className="flex-1">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="text-6xl font-black text-[#e73a40] mb-4">{String(index + 1).padStart(2, '0')}</div>
                    <h3 className="text-5xl font-black text-gray-900 mb-6">{feature.title}</h3>
                    <p className="text-2xl text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
            </div>

            <motion.div
                className="flex-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <div
                    className={`bg-gradient-to-br ${feature.color} rounded-3xl p-12 aspect-square flex items-center justify-center shadow-2xl`}
                >
                    <div className="text-9xl">
                        {index === 0 && '📊'}
                        {index === 1 && '🍱'}
                        {index === 2 && '🚴'}
                        {index === 3 && '🗺️'}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// App Screens Showcase
function AppScreensSection({ lang }: { lang: Language }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end'],
    });

    // 스크롤 진행도에 따라 현재 보여줄 이미지 인덱스 계산
    const imageIndex = useTransform(
        scrollYProgress,
        [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9]
    );

    const [currentIndex, setCurrentIndex] = useState(0);
    const t = translations[lang].screens;

    useEffect(() => {
        const unsubscribe = imageIndex.on('change', (latest) => {
            setCurrentIndex(Math.round(latest));
        });
        return () => unsubscribe();
    }, [imageIndex]);

    return (
        <section ref={ref} style={{ height: '600vh' }} className="relative bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-8 py-20">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-7xl font-black text-white text-center mb-16"
                >
                    {t.title}
                </motion.h2>

                <div className="flex items-center gap-16 max-w-7xl mx-auto">
                    {/* 좌측 설명 */}
                    <motion.div
                        className="text-white"
                        style={{ width: '500px', flexShrink: 0 }}
                        key={`desc-${currentIndex}-${lang}`}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-8xl font-black text-[#e73a40] mb-6">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-4xl font-black mb-4">
                            {t.screens[currentIndex]?.title || `Screen ${currentIndex + 1}`}
                        </h3>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            {t.screens[currentIndex]?.description || ''}
                        </p>
                    </motion.div>

                    {/* 모바일 프레임 */}
                    <div className="flex-1 flex justify-center" style={{ flexShrink: 0 }}>
                        <div className="relative">
                            {/* 폰 프레임 */}
                            <div
                                className="relative bg-gray-800 rounded-[3rem] p-3 shadow-2xl"
                                style={{ width: '320px' }}
                            >
                                <div
                                    className="bg-white rounded-[2.5rem] overflow-hidden relative"
                                    style={{ aspectRatio: '9/19.5' }}
                                >
                                    {/* 이미지 컨테이너 */}
                                    <div className="relative w-full h-full overflow-hidden">
                                        {appScreenUrls.map((url, index) => (
                                            <motion.img
                                                key={index}
                                                src={url}
                                                alt={`앱 화면 ${index + 1}`}
                                                className="absolute top-0 left-0 w-full h-full object-cover object-top"
                                                initial={{ opacity: 0, scale: 1.05 }}
                                                animate={{
                                                    opacity: currentIndex === index ? 1 : 0,
                                                    scale: currentIndex === index ? 1 : 1.05,
                                                }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 프레임 하이라이트 */}
                            <div className="absolute -inset-4  opacity-20 blur-2xl rounded-[4rem]"></div>
                        </div>
                    </div>
                </div>

                {/* 진행도 인디케이터 */}
                <div className="absolute bottom-12 flex gap-2">
                    {appScreenUrls.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentIndex === index ? 'w-8 bg-[#e73a40]' : 'w-2 bg-gray-600'
                            }`}
                        ></div>
                    ))}
                </div>

                {/* 스크롤 힌트 */}
                <motion.div
                    className="absolute bottom-32 text-gray-400 text-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {t.hint}
                </motion.div>
            </div>
        </section>
    );
}

// Impact Section
function ImpactSection({ lang }: { lang: Language }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const t = translations[lang].impact;

    return (
        <section
            ref={ref}
            className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-32 px-8 flex items-center"
        >
            <div className="max-w-7xl mx-auto w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-7xl font-black text-gray-900 mb-20 text-center"
                >
                    {t.title}
                </motion.h2>

                <div className="grid grid-cols-2 gap-12 mb-20">
                    {t.stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="bg-white rounded-3xl p-12 text-center shadow-xl"
                        >
                            <div className="text-7xl mb-4">{stat.icon}</div>
                            <div className="text-5xl font-black text-[#e73a40] mb-2">{stat.number}</div>
                            <div className="text-xl text-gray-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                >
                    <p className="text-3xl text-gray-700 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                        {t.conclusion}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// CTA Section
function CTASection({ lang }: { lang: Language }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const t = translations[lang].cta;

    return (
        <section
            ref={ref}
            className="min-h-screen bg-gradient-to-br from-[#e73a40] to-[#e7000b] flex items-center justify-center px-8 relative overflow-hidden"
        >
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center z-10"
            >
                <h2 className="text-8xl font-black text-white mb-8">{t.title}</h2>
                <p className="text-3xl text-white/90 mb-16 max-w-3xl mx-auto">{t.subtitle}</p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#e73a40] px-16 py-6 rounded-full text-2xl font-black shadow-2xl hover:shadow-3xl transition-shadow"
                >
                    {t.button}
                </motion.button>

                <div className="mt-16 flex gap-8 justify-center">
                    {t.stores.map((store) => (
                        <motion.div key={store} whileHover={{ y: -5 }} className="text-white/80 text-lg">
                            {store}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

// Footer
function Footer({ lang }: { lang: Language }) {
    const t = translations[lang].footer;

    return (
        <footer className="bg-gray-900 text-white py-16 px-8">
            <div className="max-w-7xl mx-auto text-center">
                <img src={logoUrl} alt="FiveTwoGo" className="w-16 h-16 mx-auto mb-6 rounded-2xl" />
                <h3 className="text-3xl font-black mb-4">FiveTwoGo</h3>
                <p className="text-gray-400 mb-8">{t.tagline}</p>
                <div className="text-sm text-gray-500">© 2025 FiveTwoGo. All rights reserved.</div>
            </div>
        </footer>
    );
}

export default function App() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [lang, setLang] = useState<Language>('ko');

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'ko' ? 'en' : 'ko'));
    };

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollProgress((currentScroll / totalScroll) * 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative">
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
                <motion.div className="h-full bg-[#e73a40]" style={{ width: `${scrollProgress}%` }} />
            </div>

            {/* Language Toggle Button */}
            <LanguageToggle currentLang={lang} onToggle={toggleLanguage} />

            <HeroSection lang={lang} />
            <ProblemSection lang={lang} />
            <ConceptSection lang={lang} />
            <AppScreensSection lang={lang} />
            <ImpactSection lang={lang} />
            <CTASection lang={lang} />
            <Footer lang={lang} />
        </div>
    );
}
