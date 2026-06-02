"use client";


import { motion } from "framer-motion";




export default function ReturnRefundPolicy() {


    return (


        <div className="bg-white text-black min-h-screen px-4 sm:px-6 lg:px-20 py-10 mt-16">


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto space-y-8"
            >
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold">Return and Refund Policy</h1>
                    <p className="text-sm text-gray-600">Last updated: April 27, 2026</p>
                </div>

                <p>
                    Thank you for shopping at www.boatridersports.in.
                </p>

                <p>
                    If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.
                    The following terms are applicable for any products that You purchased with Us.
                </p>

                <Section title="Interpretation and Definitions">
                
                
                    <SubSection title="Interpretation">
                        <p>
                            The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                        </p>
                    </SubSection>


                    <SubSection title="Definitions">


                        <p>For the purposes of this Return and Refund Policy:</p>

                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Policy) refers to BOATRIDER SPORTS PRIVATE LIMITED, 16/1040, BOATRIDER SPORTS PRIVATE LIMITED, FRANCIS ROAD, CHALAPPURAM, Kozhikode, Kerala, 673002.
                            </li>
                            <li>
                                <strong>Goods</strong> refer to the items offered for sale on the Service.
                            </li>
                            <li>
                                <strong>Orders</strong> mean a request by You to purchase Goods from Us.
                            </li>
                            <li>
                                <strong>Service</strong> refers to the Website.
                            </li>
                            <li>
                                <strong>Website</strong> refers to www.boatridersports.in, accessible from https://boatridersports.in/.
                            </li>
                            <li>
                                <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                            </li>
                        </ul>
                    </SubSection>
                </Section>

                <Section title="Your Order Cancellation Rights">
                    <p>
                        You are entitled to cancel Your Order within 14 days without giving any reason for doing so.
                    </p>

                    <p>
                        The deadline for cancelling an Order is 14 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.
                    </p>

                    <p>
                        In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform Us of your decision by:
                    </p>

                    <ul className="list-disc pl-6">
                        <li>By email: boatridersportsclt@gmail.com</li>
                    </ul>

                    <p>
                        We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.
                    </p>
                </Section>

                <Section title="Conditions for Returns">
                    <p>
                        In order for the Goods to be eligible for a return, please make sure that:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>The Goods were purchased in the last 14 days</li>
                        <li>The Goods are in the original packaging</li>
                    </ul>

                    <p className="mt-4">The following Goods cannot be returned:</p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>The supply of Goods made to Your specifications or clearly personalized.</li>
                        <li>The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</li>
                        <li>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
                        <li>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
                    </ul>

                    <p className="mt-4">
                        We may refuse returns that do not meet the conditions above, to the extent permitted by applicable law.
                    </p>

                    <p>
                        Only regular priced Goods may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.
                    </p>
                </Section>

                <Section title="Returning Goods">
                    <p>
                        You are responsible for the cost and risk of returning the Goods to Us.
                    </p>

                    <p>
                        You should send the Goods at the following address:
                    </p>

                    <div className="bg-gray-100 p-4 rounded-xl">
                        16/1040, BOATRIDER SPORTS PRIVATE LIMITED, FRANCIS ROAD, CHALAPPURAM, Kozhikode, Kerala, 673002
                    </div>

                    <p>
                        We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.
                    </p>
                </Section>

                <Section title="Gifts">
                    <p>
                        If the Goods were marked as a gift when purchased and then shipped directly to you, You'll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.
                    </p>

                    <p>
                        If the Goods weren't marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give it to You later, We will send the refund to the gift giver.
                    </p>
                </Section>

                <Section title="Contact Us">
                    <p>
                        If you have any questions about our Returns and Refunds Policy, please contact us:
                    </p>

                    <ul className="list-disc pl-6">
                        <li>By email: <a href="mailto:boatridersportsclt@gmail.com" className="text-blue-500">boatridersportsclt@gmail.com</a></li>
                    </ul>
                </Section>
            </motion.div>
        </div>
    );
}

function Section({ title, children }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
        >
            <h2 className="text-xl sm:text-2xl font-semibold border-b pb-2">
                {title}
            </h2>
            {children}
        </motion.div>
    );
}

function SubSection({ title, children }: any) {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-medium">{title}</h3>
            {children}
        </div>
    );
}
