'use client';
import React from 'react';
import { FileText, Globe, AlertTriangle, Scale, Mail, StopCircle, RefreshCw, XCircle } from 'lucide-react';
import Link from 'next/link';

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon?: React.ElementType }) => (
    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        {Icon && <Icon className="w-6 h-6 text-blue-600" />}
        {children}
    </h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">{children}</h3>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
);

const Definition = ({ term, definition }: { term: string, definition: React.ReactNode }) => (
    <div className="mb-4">
        <span className="font-semibold text-slate-900">{term}</span> <span className="text-slate-600">{definition}</span>
    </div>
);

export default function TermsClient() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl overflow-hidden">
                {/* Header */}
                <div className="bg-slate-900 px-8 py-16 sm:px-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-transparent"></div>
                    <FileText className="w-16 h-16 mx-auto mb-6 text-blue-400 relative z-10" />
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white relative z-10">Terms and Conditions</h1>
                    <p className="text-blue-200 text-lg relative z-10">Last updated: April 27, 2026</p>
                </div>

                {/* Content */}
                <div className="px-8 py-12 sm:px-16">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 text-blue-800">
                        <Paragraph>
                            Please read these terms and conditions carefully before using Our Service.
                        </Paragraph>
                    </div>

                    <SectionHeading icon={FileText}>Interpretation and Definitions</SectionHeading>
                    
                    <SubHeading>Interpretation</SubHeading>
                    <Paragraph>
                        The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                    </Paragraph>

                    <SubHeading>Definitions</SubHeading>
                    <Paragraph>For the purposes of these Terms and Conditions:</Paragraph>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-1 mt-4">
                        <Definition term="Affiliate" definition='means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.' />
                        <Definition term="Country" definition="refers to: Kerala, India" />
                        <Definition term="Company" definition='(referred to as either "the Company", "We", "Us" or "Our" in these Terms and Conditions) refers to BOATRIDER SPORTS PRIVATE LIMITED, 16/1040, BOATRIDER SPORTS PRIVATE LIMITED, FRANCIS ROAD, CHALAPPURAM, Kozhikode, Kerala, 673002.' />
                        <Definition term="Device" definition="means any device that can access the Service such as a computer, a cell phone or a digital tablet." />
                        <Definition term="Service" definition="refers to the Website." />
                        <Definition term="Terms and Conditions" definition='(also referred to as "Terms") means these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service. These Terms and Conditions have been created with the help of the TermsFeed Terms and Conditions Generator.' />
                        <Definition term="Third-Party Social Media Service" definition="means any services or content (including data, information, products or services) provided by a third party that is displayed, included, made available, or linked to through the Service." />
                        <Definition term="Website" definition={<span>refers to boatridersports.in/, accessible from <Link href="https://boatridersports.in/" className="text-blue-600 hover:underline">https://boatridersports.in/</Link></span>} />
                        <Definition term="You" definition="means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable." />
                    </div>

                    <SectionHeading icon={Scale}>Acknowledgment</SectionHeading>
                    <Paragraph>
                        These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                    </Paragraph>
                    <Paragraph>
                        Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
                    </Paragraph>
                    <Paragraph>
                        By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                    </Paragraph>
                    <Paragraph>
                        You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                    </Paragraph>
                    <Paragraph>
                        Your access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use, and disclose personal information. Please read Our Privacy Policy carefully before using Our Service.
                    </Paragraph>

                    <SectionHeading icon={Globe}>Links to Other Websites</SectionHeading>
                    <Paragraph>
                        Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
                    </Paragraph>
                    <Paragraph>
                        The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.
                    </Paragraph>
                    <Paragraph>
                        We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
                    </Paragraph>

                    <SubHeading>Links from a Third-Party Social Media Service</SubHeading>
                    <Paragraph>
                        The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for any Third-Party Social Media Service.
                    </Paragraph>
                    <Paragraph>
                        You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service, including any content, goods, or services made available through them. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service&apos;s terms and privacy policies.
                    </Paragraph>

                    <SectionHeading icon={StopCircle}>Termination</SectionHeading>
                    <Paragraph>
                        We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
                    </Paragraph>
                    <Paragraph>
                        Upon termination, Your right to use the Service will cease immediately.
                    </Paragraph>

                    <SectionHeading icon={AlertTriangle}>Limitation of Liability</SectionHeading>
                    <Paragraph>
                        Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven&apos;t purchased anything through the Service.
                    </Paragraph>
                    <Paragraph>
                        To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
                    </Paragraph>
                    <Paragraph>
                        Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party&apos;s liability will be limited to the greatest extent permitted by law.
                    </Paragraph>

                    <SectionHeading icon={XCircle}>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</SectionHeading>
                    <Paragraph>
                        The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
                    </Paragraph>
                    <Paragraph>
                        Without limiting the foregoing, neither the Company nor any of the company&apos;s provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
                    </Paragraph>
                    <Paragraph>
                        Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
                    </Paragraph>

                    <SectionHeading icon={Scale}>Governing Law</SectionHeading>
                    <Paragraph>
                        The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
                    </Paragraph>

                    <SubHeading>Disputes Resolution</SubHeading>
                    <Paragraph>
                        If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
                    </Paragraph>

                    <SubHeading>For European Union (EU) Users</SubHeading>
                    <Paragraph>
                        If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.
                    </Paragraph>

                    <SubHeading>United States Legal Compliance</SubHeading>
                    <Paragraph>
                        You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
                    </Paragraph>

                    <SectionHeading icon={RefreshCw}>Severability and Waiver</SectionHeading>
                    
                    <SubHeading>Severability</SubHeading>
                    <Paragraph>
                        If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
                    </Paragraph>

                    <SubHeading>Waiver</SubHeading>
                    <Paragraph>
                        Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party&apos;s ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
                    </Paragraph>

                    <SectionHeading>Translation Interpretation</SectionHeading>
                    <Paragraph>
                        These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.
                    </Paragraph>

                    <SectionHeading>Changes to These Terms and Conditions</SectionHeading>
                    <Paragraph>
                        We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
                    </Paragraph>
                    <Paragraph>
                        By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.
                    </Paragraph>

                    <SectionHeading icon={Mail}>Contact Us</SectionHeading>
                    <Paragraph>If you have any questions about these Terms and Conditions, You can contact us:</Paragraph>
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
