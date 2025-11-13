import type { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { PageSection } from '../modules/page-sections/page-section.entity';
import { Event } from '../modules/events/event.entity';
import { TeamMember } from '../modules/team/team-member.entity';
import { GalleryItem } from '../modules/gallery/gallery-item.entity';
import { Setting } from '../modules/settings/setting.entity';
import { UsersService } from '../modules/users/users.service';

async function seedPageSections(dataSource: DataSource) {
  const repo = dataSource.getRepository(PageSection);
  if (await repo.count()) {
    await repo.clear();
  }

  const homeSections: Partial<PageSection>[] = [
    {
      page: 'home',
      title: 'Hero',
      heading:
        'Welcome to the American Marketing Association at Central Michigan University',
      description:
        'After nearly a decade, AMA has been revitalized at CMU—reigniting a national marketing community on campus. We are here to help you learn, network, lead, and grow alongside the brightest minds in the industry.',
      displayOrder: 0,
      imageUrl:
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80',
    },
    {
      page: 'home',
      title: 'Network & Connections',
      heading: 'Network & Connections',
      description:
        'Build relationships with marketing professionals, industry leaders, recruiters, guest speakers, and ambitious students across the nation.',
      displayOrder: 1,
    },
    {
      page: 'home',
      title: 'Develop Real Marketing Skills',
      heading: 'Develop Real Marketing Skills',
      description:
        'Gain hands-on experience in branding, market research, digital strategy, content creation, analytics, consumer behavior, event marketing, and more.',
      displayOrder: 2,
    },
    {
      page: 'home',
      title: 'Professional Growth',
      heading: 'Professional Growth',
      description:
        'Level up through workshops, mentorship, resume labs, certifications, conferences, and speaker sessions that build your confidence and professionalism.',
      displayOrder: 3,
    },
    {
      page: 'home',
      title: 'Access to Opportunities',
      heading: 'Access to Opportunities',
      description:
        'Unlock internships, job pipelines, company spotlights, collaborative projects, and exclusive AMA student experiences across the marketing field.',
      displayOrder: 4,
    },
    {
      page: 'home',
      title: 'National Marketing Movement',
      heading: 'Become Part of a National Marketing Movement',
      description:
        'Joining AMA at CMU connects you to 30,000 members, 76 professional chapters, and 250 collegiate chapters dedicated to shaping brands, innovations, and campaigns that impact the world every day.',
      displayOrder: 5,
    },
  ];

  const aboutSections: Partial<PageSection>[] = [
    {
      page: 'about',
      title: 'Hero',
      heading: 'Welcome to AMA at Central Michigan University',
      description:
        'The American Marketing Association is one of the most influential marketing organizations in the United States. With 30,000 members nationwide, AMA connects students and professionals to the highest levels of marketing education, industry trends, and career growth. We’re proud to bring that momentum back to CMU.',
      displayOrder: 0,
    },
    {
      page: 'about',
      title: 'Mission',
      heading: 'Our Mission',
      description:
        'To empower students to become innovative, industry-ready marketing leaders through community, mentorship, and immersive learning experiences on campus and beyond.',
      displayOrder: 1,
    },
    {
      page: 'about',
      title: 'Why Join',
      heading: 'Why Join AMA at CMU?',
      description:
        'Network with industry leaders, develop real marketing skills, grow professionally, and access internships, competitions, and national AMA resources designed to help you launch your career.',
      displayOrder: 2,
    },
    {
      page: 'about',
      title: 'National Network',
      heading: 'Part of a National Marketing Network',
      description:
        'AMA’s 250 collegiate chapters offer unparalleled access to conferences, competitions, certifications, and mentorship. When you join CMU AMA, you tap into a national ecosystem of marketers who shape the brands and innovations of tomorrow.',
      displayOrder: 3,
    },
    {
      page: 'about',
      title: 'Call to Action',
      heading: 'Ready to Build Your Future in Marketing?',
      description:
        'Join AMA. Learn. Network. Lead. Grow. Together we’re re-establishing the premier marketing community at Central Michigan University.',
      displayOrder: 4,
    },
  ];

  await repo.save([...homeSections, ...aboutSections]);
  console.log('Seeded page sections');
}

async function seedEvents(dataSource: DataSource) {
  const repo = dataSource.getRepository(Event);
  if (await repo.count()) {
    await repo.clear();
  }

  const events: Partial<Event>[] = [
    {
      title: 'Digital Marketing Workshop',
      date: '2025-03-15',
      time: '6:00 PM - 8:00 PM',
      location: 'Park Library Room 301',
      description:
        'Learn the latest strategies in SEO, social media marketing, and content creation. Industry experts will share real-world case studies and actionable insights you can apply immediately.',
      category: 'Workshop',
      spots: 30,
    },
    {
      title: 'Networking Night with Alumni',
      date: '2025-03-22',
      time: '7:00 PM - 9:00 PM',
      location: 'University Center Ballroom',
      description:
        'Connect with AMA alumni working at top marketing agencies and corporations. Casual networking environment with refreshments provided.',
      category: 'Networking',
      spots: 50,
    },
    {
      title: 'Case Competition Kickoff',
      date: '2025-04-05',
      time: '5:00 PM - 7:00 PM',
      location: 'Business Building Auditorium',
      description:
        'Launch of our annual marketing case competition. Teams will tackle a real business challenge with prizes for top performers. Great for your resume!',
      category: 'Competition',
      spots: 0,
    },
    {
      title: 'Social Media Strategy Seminar',
      date: '2025-04-12',
      time: '6:30 PM - 8:30 PM',
      location: 'Online via Zoom',
      description:
        'Dive deep into platform-specific strategies for Instagram, TikTok, LinkedIn, and more. Learn how to create engaging content and measure ROI.',
      category: 'Seminar',
      spots: 0,
    },
    {
      title: 'Company Tour: Local Marketing Agency',
      date: '2025-04-19',
      time: '4:00 PM - 6:00 PM',
      location: 'Off-Campus (Transportation Provided)',
      description:
        'Behind-the-scenes tour of a successful local marketing agency. See how teams collaborate, meet with professionals, and learn about career paths.',
      category: 'Tour',
      spots: 20,
    },
    {
      title: 'End of Year Social & Awards',
      date: '2025-04-26',
      time: '7:00 PM - 10:00 PM',
      location: 'The Bird Bar & Grill',
      description:
        'Celebrate another successful year with your AMA family! Awards ceremony, dinner, and socializing. Open to all members.',
      category: 'Social',
      spots: 0,
    },
  ];

  await repo.save(events);
  console.log('Seeded events');
}

async function seedTeam(dataSource: DataSource) {
  const repo = dataSource.getRepository(TeamMember);
  if (await repo.count()) {
    await repo.clear();
  }

  const members: Partial<TeamMember>[] = [
    {
      name: 'Umme Aimen Khan',
      role: 'President',
      major: 'Marketing & Digital Strategy, Class of 2025',
      bio: 'International student from Pakistan with a passion for storytelling and brand innovation. Leads AMA CMU’s vision, strategy, and partnerships across campus and the national AMA network.',
      email: 'president@cmich.edu',
      linkedin: 'https://www.linkedin.com',
      imageUrl:
        'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=600&q=80',
      displayOrder: 0,
    },
    {
      name: 'Sarah Mitchell',
      role: 'Vice President',
      major: 'Business Administration, Class of 2025',
      bio: 'Oversees operations, project management, and executive board alignment. Sarah ensures every AMA initiative is executed with excellence and member value in mind.',
      email: 'vicepresident@cmich.edu',
      linkedin: 'https://www.linkedin.com',
      imageUrl:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
      displayOrder: 1,
    },
    {
      name: 'Sydney Clark',
      role: 'VP of Membership',
      major: 'Marketing & Communications, Class of 2026',
      bio: 'Champions recruitment, onboarding, and member engagement. Sydney builds inclusive experiences that connect new and returning members to opportunities.',
      email: 'membership@cmich.edu',
      linkedin: 'https://www.linkedin.com',
      imageUrl:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      displayOrder: 2,
    },
    {
      name: 'Safwan Rahman',
      role: 'Treasurer',
      major: 'Finance & Marketing, Class of 2026',
      bio: 'Manages budgets, fundraising, and sponsorship outreach. Safwan keeps AMA CMU financially healthy so every idea can become an impactful experience.',
      email: 'treasurer@cmich.edu',
      linkedin: 'https://www.linkedin.com',
      imageUrl:
        'https://images.unsplash.com/photo-1544723795-43253777e8cb?auto=format&fit=crop&w=600&q=80',
      displayOrder: 3,
    },
    {
      name: 'Paris Green',
      role: 'VP of Social Media & Marketing',
      major: 'Integrated Marketing, Class of 2025',
      bio: 'Designs and executes creative campaigns that tell AMA CMU’s story. Paris leads content creation, social strategy, and event promotion across all channels.',
      email: 'marketing@cmich.edu',
      linkedin: 'https://www.linkedin.com',
      imageUrl:
        'https://images.unsplash.com/photo-1573497491321-3b929d6b9983?auto=format&fit=crop&w=600&q=80',
      displayOrder: 4,
    },
    {
      name: 'Prosper Mapepa',
      role: 'VP of Web & Digital Experience',
      major: 'Information Systems, Class of 2025',
      bio: 'Drives the digital experience for AMA CMU by managing the website, analytics, and technical integrations that support member engagement.',
      email: 'web@cmich.edu',
      linkedin: 'https://www.linkedin.com',
      imageUrl:
        'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=600&q=80',
      displayOrder: 5,
    },
  ];

  await repo.save(members);
  console.log('Seeded team members');
}

async function seedGallery(dataSource: DataSource) {
  const repo = dataSource.getRepository(GalleryItem);
  if (await repo.count()) {
    await repo.clear();
  }

  const items: Partial<GalleryItem>[] = [
    {
      url: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
      title: 'Annual Marketing Conference 2024',
      category: 'Events',
      caption:
        'Networking with marketing professionals at our flagship conference.',
      displayOrder: 0,
    },
    {
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
      title: 'Case Competition Finals',
      category: 'Competitions',
      caption: 'Our AMA team presenting their winning campaign to judges.',
      displayOrder: 1,
    },
    {
      url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
      title: 'Industry Networking Night',
      category: 'Networking',
      caption: 'Members connecting with alumni and agency partners.',
      displayOrder: 2,
    },
    {
      url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80',
      title: 'Digital Marketing Workshop',
      category: 'Workshops',
      caption: 'Hands-on learning during our analytics deep dive.',
      displayOrder: 3,
    },
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
      title: 'National Competition Winners',
      category: 'Competitions',
      caption: 'Celebrating our chapter’s national recognition for excellence.',
      displayOrder: 4,
    },
    {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
      title: 'Community Service Day',
      category: 'Community',
      caption: 'Giving back through marketing-focused volunteer projects.',
      displayOrder: 5,
    },
    {
      url: 'https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=1600&q=80',
      title: 'Executive Board 2024-2025',
      category: 'Leadership',
      caption: 'Our executive board leading the chapter forward.',
      displayOrder: 6,
    },
    {
      url: 'https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=1600&q=80',
      title: 'Agency Tour - Detroit',
      category: 'Events',
      caption: 'Behind-the-scenes look at a metro Detroit marketing agency.',
      displayOrder: 7,
    },
    {
      url: 'https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1600&q=80',
      title: 'End of Year Celebration',
      category: 'Social',
      caption: 'Wrapping up the year with awards and celebrations.',
      displayOrder: 8,
    },
    {
      url: 'https://images.unsplash.com/photo-1530785602389-07594beb8b73?auto=format&fit=crop&w=1600&q=80',
      title: 'Guest Speaker Series',
      category: 'Workshops',
      caption: 'Industry leaders sharing insights with members.',
      displayOrder: 9,
    },
    {
      url: 'https://images.unsplash.com/photo-1529338296731-c4280a44fc23?auto=format&fit=crop&w=1600&q=80',
      title: 'Project Collaboration',
      category: 'Events',
      caption: 'Students collaborating on a live client marketing project.',
      displayOrder: 10,
    },
    {
      url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1600&q=80',
      title: 'Career Fair Presence',
      category: 'Networking',
      caption: 'Members connecting with employers at the Spring Career Fair.',
      displayOrder: 11,
    },
  ];

  await repo.save(items);
  console.log('Seeded gallery items');
}

async function seedSettings(dataSource: DataSource) {
  const repo = dataSource.getRepository(Setting);
  if (await repo.count()) {
    await repo.clear();
  }

  const settings: Partial<Setting>[] = [
    {
      key: 'contact',
      value: {
        email: 'ama@cmich.edu',
        phone: '(989) 774-XXXX',
        officeHours: 'Monday - Friday · 9:00 AM - 5:00 PM EST',
        locationLines: [
          'Central Michigan University',
          'Mount Pleasant, MI 48859',
        ],
      },
    },
    {
      key: 'socials',
      value: {
        instagram: 'https://www.instagram.com',
        linkedin: 'https://www.linkedin.com',
        facebook: 'https://www.facebook.com',
        website: 'https://www.ama.org',
      },
    },
    {
      key: 'footer',
      value: {
        blurb:
          'The American Marketing Association at Central Michigan University empowers the next generation of marketers through immersive experiences, mentorship, and community.',
      },
    },
    {
      key: 'advisor',
      value: {
        name: 'Jeff Hoyle',
        role: 'Faculty Advisor',
        title: 'Instructor of Marketing, College of Business Administration',
        bio: 'Jeff guides AMA CMU with industry insight, academic mentorship, and professional support as we grow and relaunch the chapter on campus.',
        email: 'hoyle1j@cmich.edu',
        office: 'Grawn Hall, Room 215',
        imageUrl:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      },
    },
  ];

  await repo.save(settings);
  console.log('Seeded settings');
}

async function seedAdmin(appContext: INestApplicationContext) {
  const usersService = appContext.get(UsersService);

  const defaultEmail = process.env.ADMIN_EMAIL ?? 'admin@ama-cmu.org';
  const defaultPassword = process.env.ADMIN_PASSWORD ?? 'Letmein@99x!';
  const defaultName = process.env.ADMIN_NAME ?? 'Site Administrator';

  const existing = await usersService.findByEmail(defaultEmail);
  if (existing) {
    console.log(`Admin user ${defaultEmail} already exists, skipping...`);
    return;
  }

  await usersService.createAdmin({
    email: defaultEmail,
    password: defaultPassword,
    name: defaultName,
  });
  console.log(`Created admin account (${defaultEmail})`);
}

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const dataSource = app.get(DataSource);

    await seedPageSections(dataSource);
    await seedEvents(dataSource);
    await seedTeam(dataSource);
    await seedGallery(dataSource);
    await seedSettings(dataSource);
    await seedAdmin(app);

    console.log('✅ Seeding complete');
  } catch (error) {
    console.error('❌ Seeding failed', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
