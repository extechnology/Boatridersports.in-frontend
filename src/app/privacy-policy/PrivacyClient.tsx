import React from 'react';
import { Shield, FileText, Globe, Database, UserCheck, Lock, Mail, Link as LinkIcon, RefreshCw, Eye } from 'lucide-react';
import Link from 'next/link';

// Helper component for Section Headings
const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon?: React.ElementType }) => (
    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        {Icon && <Icon className="w-6 h-6 text-blue-600" />}
        {children}
    </h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">{children}</h3>
);

const SubSubHeading = ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">{children}</h4>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
);

const BulletList = ({ items }: { items: React.ReactNode[] }) => (
    <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6 marker:text-blue-400">
        {items.map((item, idx) => (
            <li key={idx}>{item}</li>
        ))}
    </ul>
);

const Definition = ({ term, definition }: { term: string, definition: React.ReactNode }) => (
    <div className="mb-4">
        <span className="font-semibold text-slate-900">{term}</span> <span className="text-slate-600">{definition}</span>
    </div>
);

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl overflow-hidden">
                
                {/* Header */}
                <div className="bg-slate-900 px-8 py-16 sm:px-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-transparent"></div>
                    <Shield className="w-16 h-16 mx-auto mb-6 text-blue-400 relative z-10" />
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white relative z-10">Privacy Policy</h1>
                    <p className="text-blue-200 text-lg relative z-10">Last updated: April 27, 2026</p>
                </div>

                {/* Content */}
                <div className="px-8 py-12 sm:px-16">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 text-blue-800">
                        <Paragraph>
                            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                        </Paragraph>
                        <p className="text-slate-600 leading-relaxed">
                            We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                        </p>
                    </div>

                    <SectionHeading icon={FileText}>Interpretation and Definitions</SectionHeading>
                    
                    <SubHeading>Interpretation</SubHeading>
                    <Paragraph>
                        The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                    </Paragraph>

                    <SubHeading>Definitions</SubHeading>
                    <Paragraph>For the purposes of this Privacy Policy:</Paragraph>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-1 mt-4">
                        <Definition term="Account" definition="means a unique account created for You to access our Service or parts of our Service." />
                        <Definition term="Affiliate" definition='means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.' />
                        <Definition term="Company" definition='(referred to as either "the Company", "We", "Us" or "Our" in this Privacy Policy) refers to BOATRIDER SPORTS PRIVATE LIMITED, 6/1040, BOATRIDER SPORTS PRIVATE LIMITED, FRANCIS ROAD, CHALAPPURAM, Kozhikode, Kerala, 673002.' />
                        <Definition term="Cookies" definition="are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses." />
                        <Definition term="Country" definition="refers to: Kerala, India" />
                        <Definition term="Device" definition="means any device that can access the Service such as a computer, a cell phone or a digital tablet." />
                        <Definition term="Personal Data" definition='(or "Personal Information") is any information that relates to an identified or identifiable individual. We use "Personal Data" and "Personal Information" interchangeably unless a law uses a specific term.' />
                        <Definition term="Service" definition="refers to the Website." />
                        <Definition term="Service Provider" definition="means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used." />
                        <Definition term="Usage Data" definition="refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit)." />
                        <Definition term="Website" definition={<span>refers to www.boatridersports.in, accessible from <Link href="https://boatridersports.in/" className="text-blue-600 hover:underline">https://boatridersports.in/</Link>.</span>} />
                        <Definition term="You" definition="means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable." />
                    </div>

                    <SectionHeading icon={Database}>Collecting and Using Your Personal Data</SectionHeading>

                    <SubHeading>Types of Data Collected</SubHeading>
                    
                    <SubSubHeading>Personal Data</SubSubHeading>
                    <Paragraph>
                        While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                    </Paragraph>
                    <BulletList items={[
                        "Email address",
                        "First name and last name",
                        "Phone number",
                        "Address, State, Province, ZIP/Postal code, City"
                    ]} />

                    <SubSubHeading>Usage Data</SubSubHeading>
                    <Paragraph>Usage Data is collected automatically when using the Service.</Paragraph>
                    <Paragraph>
                        Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                    </Paragraph>
                    <Paragraph>
                        When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device's unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                    </Paragraph>
                    <Paragraph>
                        We may also collect information that Your browser sends whenever You visit Our Service or when You access the Service by or through a mobile device.
                    </Paragraph>

                    <SubHeading>Tracking Technologies and Cookies</SubHeading>
                    <Paragraph>
                        We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies We use include beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:
                    </Paragraph>
                    <ul className="list-disc pl-6 space-y-4 text-slate-600 mb-6 marker:text-blue-400">
                        <li>
                            <strong className="text-slate-900">Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.
                        </li>
                        <li>
                            <strong className="text-slate-900">Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).
                        </li>
                    </ul>
                    <Paragraph>
                        Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
                    </Paragraph>
                    <Paragraph>
                        Where required by law, we use non-essential cookies (such as analytics, advertising, and remarketing cookies) only with Your consent. You can withdraw or change Your consent at any time using Our cookie preferences tool (if available) or through Your browser/device settings. Withdrawing consent does not affect the lawfulness of processing based on consent before its withdrawal.
                    </Paragraph>
                    <Paragraph>We use both Session and Persistent Cookies for the purposes set out below:</Paragraph>
                    
                    <div className="space-y-6 mt-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                            <h4 className="font-semibold text-slate-900 mb-2">Necessary / Essential Cookies</h4>
                            <div className="text-sm text-slate-500 mb-2">
                                <p><span className="font-medium text-slate-700">Type:</span> Session Cookies</p>
                                <p><span className="font-medium text-slate-700">Administered by:</span> Us</p>
                            </div>
                            <p className="text-slate-600 text-sm">
                                <span className="font-medium text-slate-700">Purpose:</span> These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                            </p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                            <h4 className="font-semibold text-slate-900 mb-2">Cookies Policy / Notice Acceptance Cookies</h4>
                            <div className="text-sm text-slate-500 mb-2">
                                <p><span className="font-medium text-slate-700">Type:</span> Persistent Cookies</p>
                                <p><span className="font-medium text-slate-700">Administered by:</span> Us</p>
                            </div>
                            <p className="text-slate-600 text-sm">
                                <span className="font-medium text-slate-700">Purpose:</span> These Cookies identify if users have accepted the use of cookies on the Website.
                            </p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                            <h4 className="font-semibold text-slate-900 mb-2">Functionality Cookies</h4>
                            <div className="text-sm text-slate-500 mb-2">
                                <p><span className="font-medium text-slate-700">Type:</span> Persistent Cookies</p>
                                <p><span className="font-medium text-slate-700">Administered by:</span> Us</p>
                            </div>
                            <p className="text-slate-600 text-sm">
                                <span className="font-medium text-slate-700">Purpose:</span> These Cookies allow Us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Paragraph>
                            For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of Our Privacy Policy.
                        </Paragraph>
                    </div>

                    <SectionHeading icon={UserCheck}>Use of Your Personal Data</SectionHeading>
                    <Paragraph>The Company may use Personal Data for the following purposes:</Paragraph>
                    <ul className="list-disc pl-6 space-y-3 text-slate-600 mb-8 marker:text-blue-400">
                        <li><strong className="text-slate-900">To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
                        <li><strong className="text-slate-900">To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
                        <li><strong className="text-slate-900">For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                        <li><strong className="text-slate-900">To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
                        <li><strong className="text-slate-900">To provide You</strong> with news, special offers, and general information about other goods, services and events which We offer that are similar to those that you have already purchased or inquired about unless You have opted not to receive such information.</li>
                        <li><strong className="text-slate-900">To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
                        <li><strong className="text-slate-900">For business transfers:</strong> We may use Your Personal Data to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</li>
                        <li><strong className="text-slate-900">For other purposes:</strong> We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</li>
                    </ul>

                    <Paragraph>We may share Your Personal Data in the following situations:</Paragraph>
                    <BulletList items={[
                        <><strong className="text-slate-900">With Service Providers:</strong> We may share Your Personal Data with Service Providers to monitor and analyze the use of our Service, to contact You.</>,
                        <><strong className="text-slate-900">For business transfers:</strong> We may share or transfer Your Personal Data in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</>,
                        <><strong className="text-slate-900">With Affiliates:</strong> We may share Your Personal Data with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</>,
                        <><strong className="text-slate-900">With business partners:</strong> We may share Your Personal Data with Our business partners to offer You certain products, services or promotions.</>,
                        <><strong className="text-slate-900">With other users:</strong> If Our Service offers public areas, when You share Personal Data or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</>,
                        <><strong className="text-slate-900">With Your consent:</strong> We may disclose Your Personal Data for any other purpose with Your consent.</>
                    ]} />

                    <SectionHeading icon={RefreshCw}>Retention of Your Personal Data</SectionHeading>
                    <Paragraph>
                        The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if We are required to retain Your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                    </Paragraph>
                    <Paragraph>
                        Where possible, We apply shorter retention periods and/or reduce identifiability by deleting, aggregating, or anonymizing data. Unless otherwise stated, the retention periods below are maximum periods ("up to") and We may delete or anonymize data sooner when it is no longer needed for the relevant purpose. We apply different retention periods to different categories of Personal Data based on the purpose of processing and legal obligations:
                    </Paragraph>
                    
                    <div className="space-y-6 mt-6 mb-8">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                            <h4 className="font-semibold text-slate-900 mb-2">Account Information</h4>
                            <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1 marker:text-slate-400">
                                <li><strong className="text-slate-700">User Accounts:</strong> retained for the duration of your account relationship plus up to 24 months after account closure to handle any post-termination issues or resolve disputes.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                            <h4 className="font-semibold text-slate-900 mb-2">Customer Support Data</h4>
                            <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1 marker:text-slate-400">
                                <li><strong className="text-slate-700">Support tickets and correspondence:</strong> up to 24 months from the date of ticket closure to resolve follow-up inquiries, track service quality, and defend against potential legal claims</li>
                                <li><strong className="text-slate-700">Chat transcripts:</strong> up to 24 months for quality assurance and staff training purposes.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                            <h4 className="font-semibold text-slate-900 mb-2">Usage Data</h4>
                            <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1 marker:text-slate-400">
                                <li><strong className="text-slate-700">Website analytics data</strong> (cookies, IP addresses, device identifiers): up to 24 months from the date of collection, which allows us to analyze trends while respecting privacy principles.</li>
                                <li><strong className="text-slate-700">Server logs</strong> (IP addresses, access times): up to 24 months for security monitoring and troubleshooting purposes.</li>
                            </ul>
                        </div>
                    </div>

                    <Paragraph>
                        Usage Data is retained in accordance with the retention periods described above, and may be retained longer only where necessary for security, fraud prevention, or legal compliance.
                    </Paragraph>

                    <Paragraph>We may retain Personal Data beyond the periods stated above for different reasons:</Paragraph>
                    <BulletList items={[
                        <><strong className="text-slate-900">Legal obligation:</strong> We are required by law to retain specific data (e.g., financial records for tax authorities).</>,
                        <><strong className="text-slate-900">Legal claims:</strong> Data is necessary to establish, exercise, or defend legal claims.</>,
                        <><strong className="text-slate-900">Your explicit request:</strong> You ask Us to retain specific information.</>,
                        <><strong className="text-slate-900">Technical limitations:</strong> Data exists in backup systems that are scheduled for routine deletion.</>
                    ]} />

                    <Paragraph>You may request information about how long We will retain Your Personal Data by contacting Us.</Paragraph>
                    <Paragraph>When retention periods expire, We securely delete or anonymize Personal Data according to the following procedures:</Paragraph>
                    <BulletList items={[
                        <><strong className="text-slate-900">Deletion:</strong> Personal Data is removed from Our systems and no longer actively processed.</>,
                        <><strong className="text-slate-900">Backup retention:</strong> Residual copies may remain in encrypted backups for a limited period consistent with our backup retention schedule and are not restored except where necessary for security, disaster recovery, or legal compliance.</>,
                        <><strong className="text-slate-900">Anonymization:</strong> In some cases, We convert Personal Data into anonymous statistical data that cannot be linked back to You. This anonymized data may be retained indefinitely for research and analytics.</>
                    ]} />

                    <SectionHeading icon={Globe}>Transfer of Your Personal Data</SectionHeading>
                    <Paragraph>
                        Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from Your jurisdiction.
                    </Paragraph>
                    <Paragraph>
                        Where required by applicable law, We will ensure that international transfers of Your Personal Data are subject to appropriate safeguards and supplementary measures where appropriate. The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
                    </Paragraph>

                    <SectionHeading>Delete Your Personal Data</SectionHeading>
                    <Paragraph>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</Paragraph>
                    <Paragraph>Our Service may give You the ability to delete certain information about You from within the Service.</Paragraph>
                    <Paragraph>
                        You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any Personal Data that You have provided to Us.
                    </Paragraph>
                    <Paragraph>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</Paragraph>

                    <SectionHeading icon={Eye}>Disclosure of Your Personal Data</SectionHeading>
                    
                    <SubHeading>Business Transactions</SubHeading>
                    <Paragraph>
                        If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                    </Paragraph>

                    <SubHeading>Law enforcement</SubHeading>
                    <Paragraph>
                        Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                    </Paragraph>

                    <SubHeading>Other legal requirements</SubHeading>
                    <Paragraph>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</Paragraph>
                    <BulletList items={[
                        "Comply with a legal obligation",
                        "Protect and defend the rights or property of the Company",
                        "Prevent or investigate possible wrongdoing in connection with the Service",
                        "Protect the personal safety of Users of the Service or the public",
                        "Protect against legal liability"
                    ]} />

                    <SectionHeading icon={Lock}>Security of Your Personal Data</SectionHeading>
                    <Paragraph>
                        The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.
                    </Paragraph>

                    <SectionHeading>Detailed Information on the Processing of Your Personal Data</SectionHeading>
                    <Paragraph>
                        The Service Providers We use may have access to Your Personal Data. These third-party vendors collect, store, use, process and transfer information about Your activity on Our Service in accordance with their Privacy Policies.
                    </Paragraph>

                    <SubHeading>Usage, Performance and Miscellaneous</SubHeading>
                    <Paragraph>We may use third-party Service Providers to maintain and improve our Service.</Paragraph>
                    
                    <div className="space-y-6 mt-6">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                            <h4 className="font-semibold text-slate-900 mb-2">Mouseflow</h4>
                            <p className="text-slate-600 text-sm mb-2">
                                Mouseflow is a session replay and heatmap tool that shows how visitors click, move, scroll, browse, and pay attention on websites. The service is operated by ApS. Mouseflow service may collect information from Your device.
                            </p>
                            <p className="text-slate-600 text-sm">
                                The information gathered by Mouseflow is held in accordance with its Privacy Policy: <a href="https://mouseflow.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://mouseflow.com/privacy/</a>
                            </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                            <h4 className="font-semibold text-slate-900 mb-2">FreshDesk</h4>
                            <p className="text-slate-600 text-sm mb-2">
                                FreshDesk is a customer support software. The service is operated by Freshworks, Inc. FreshDesk service may collect information from Your Device.
                            </p>
                            <p className="text-slate-600 text-sm">
                                The information gathered by FreshDesk is held in accordance with its Privacy Policy: <a href="https://www.freshworks.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.freshworks.com/privacy/</a>
                            </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                            <h4 className="font-semibold text-slate-900 mb-2">Google Places</h4>
                            <p className="text-slate-600 text-sm mb-2">
                                Google Places is a service that returns information about places using HTTP requests. It is operated by Google. Google Places service may collect information from You and from Your Device for security purposes.
                            </p>
                            <p className="text-slate-600 text-sm">
                                The information gathered by Google Places is held in accordance with the Privacy Policy of Google: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.google.com/intl/en/policies/privacy/</a>
                            </p>
                        </div>
                    </div>

                    <SectionHeading>Children's Privacy</SectionHeading>
                    <Paragraph>
                        Our Service does not address anyone under the age of 16. We do not knowingly collect personally identifiable information from anyone under the age of 16. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 16 without verification of parental consent, We take steps to remove that information from Our servers.
                    </Paragraph>
                    <Paragraph>
                        If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.
                    </Paragraph>

                    <SectionHeading icon={LinkIcon}>Links to Other Websites</SectionHeading>
                    <Paragraph>
                        Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
                    </Paragraph>
                    <Paragraph>
                        We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                    </Paragraph>

                    <SectionHeading>Changes to this Privacy Policy</SectionHeading>
                    <Paragraph>
                        We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                    </Paragraph>
                    <Paragraph>
                        We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
                    </Paragraph>
                    <Paragraph>
                        You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                    </Paragraph>

                    <SectionHeading icon={Mail}>Contact Us</SectionHeading>
                    <Paragraph>If you have any questions about this Privacy Policy, You can contact us:</Paragraph>
                    <div className="bg-blue-50 text-blue-900 rounded-xl p-6 mt-4 flex items-center gap-4">
                        <div className="bg-white p-3 rounded-full shadow-sm">
                            <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-semibold">By email</p>
                            <a href="mailto:boatridersportsclt@gmail.com" className="text-blue-700 hover:text-blue-800 hover:underline">
                                boatridersportsclt@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
