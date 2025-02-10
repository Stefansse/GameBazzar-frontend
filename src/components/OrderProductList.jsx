import React, { useState } from 'react';
import '../OrderProductList.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faInfoCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const OrderProductList = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  const goToContactPage = () => {
    navigate('/contact'); // Change '/contact' to the route of your contact page
  };

  return (
    <div className="list-container">
      <h2>Order and Product Support</h2>
      <ul>
        <li className="list-item" onClick={() => handleClick("help")}>
          I need help with the order I made
          {activeItem === "help" && (
            <ul className="sub-list">
              <li className="sub-list-item">
                <strong>The product is missing content</strong>
                <p className="sub-description">We apologize for the inconvenience.
                 Before reaching out to us, please check the product page to ensure that the missing content is supposed to be included in your purchase.
                 If it is supposed to be included, please contact us with your order number and a detailed description of the missing content.
                 This will help us investigate and resolve the issue as quickly as possible. We take the satisfaction of our customers seriously and will do everything we can to resolve the issue to your satisfaction..</p>
              </li>
              <li className="sub-list-item">
                <strong>The product I received is not the product I bought</strong>
                <p className="sub-description">We apologize for the mistake.
                Please contact us with your order number and a screenshot of the product that was activated. This will help us investigate and resolve the issue as quickly as possible. We take the satisfaction of our customers seriously and will do everything we can to resolve the issue to your satisfaction. We apologize for any inconvenience this may have caused and thank you for bringing it to our attention.</p>
              </li>
              <li className="sub-list-item">
                <strong>The product disappeared from my library</strong>
                <p className="sub-description">We apologize for the inconvenience.
                Please contact us with your order number and a screenshot of your library showing the missing product. This will help us investigate and resolve the issue as quickly as possible. We take the satisfaction of our customers seriously and will do everything we can to resolve the issue to your satisfaction. It's possible that the product may have been removed from the library due to a technical issue or for compliance reasons. Our team will assist you to find a solution. We apologize for any inconvenience this may have caused and thank you for bringing it to our attention.</p>
              </li>

              <li className="sub-list-item">
                <strong>Performance issues with games</strong>
                <p className="sub-description">
                We apologize for any performance issues you may be experiencing with your game. Unfortunately, as we are only the seller of the product and not the developer or publisher of the game, we may not have all the information necessary to troubleshoot and resolve the issue. However, we recommend contacting the support of the platform where the key was activated or the developer/publisher of the game for assistance. They will have the necessary resources and expertise to help you with the technical aspects of the game. We apologize for any inconvenience this may have caused and thank you for bringing it to our attention. If you have any other questions or concerns, please don't hesitate to contact us.
                </p>
              </li>

              <li className="sub-list-item">
                <strong>I don't like the game</strong>
                <p className="sub-description">We understand that not every game will be to everyone's taste.
                However, as a digital retailer, we are unable to offer refunds for products that have been redeemed or activated, as we are not able to take back the keys once they have been activated.This is stated in our terms and conditions, which were agreed to at the time of purchase.We apologize for any disappointment this may cause. However, we encourage you to leave a review on the product page, to help inform other customers about your experience with the game. We value your feedback and appreciate your understanding in this matter.
               </p>
              </li>
            </ul>
          )}
        </li>
        <li className="list-item" onClick={() => handleClick("info")}>
          I'd like information before buying
          {activeItem === "info" && (
            <ul className="sub-list">
              <li className="sub-list-item">
                <strong>Are the games official?</strong>
                <p className="sub-description">Yes, all of our products are authentic and sourced from authorized resellers, such as Steam, Origin, Battlenet, and more. We have been in business since 2012 and have built a reputation for providing our customers with the best prices.We understand that some customers may be concerned about the authenticity of our products due to the discounts we offer.To assure you, we have received over 580,000 reviews on Trustpilot, with an average score of 4.8/5.We take pride in our customer satisfaction and want to assure you that we only sell authentic products at the best price. You can check our privacy policy and terms and conditions to learn more about us and our business.
                </p>
              </li>
              <li className="sub-list-item">
                <strong>Is there a deadline to use my key?</strong>
                <p className="sub-description">Most of the keys we sell do not have an expiry date, so you can activate them at any time. However, we encourage you to activate your key as soon as possible to ensure that it remains valid. In some rare cases, keys may be subject to expiration or deactivation by the publisher or reseller.
If you don't want to activate your key right away, you might consider purchasing an Instant Gaming gift card instead. This allows you to have the key in your possession without the pressure of activating it right away, while still being able to use it at a later date. Please note that we can't be held responsible for any expiration or deactivation of a key once it has been sold, so we strongly encourage you to redeem your key as soon as possible.
</p>
              </li>
              <li className="sub-list-item">
                <strong>Are the codes valid in all countrie</strong>
                <p className="sub-description">Most of the codes we sell are region or country restricted, meaning they can only be activated in certain countries or regions. This information is clearly displayed on the product page, so please check the product details before making your purchase. If you don't see any information about restrictions on the product page that means it's not restricted.
If you are unsure about the region restrictions for a specific key, please feel free to contact us for confirmation. We will be happy to assist you. In the event that you are unable to activate a key due to region restrictions, please contact us and we will refund your purchase without any questions asked. We want to ensure that our customers are completely satisfied with their purchases
</p>
              </li>

              <li className="sub-list-item">
                <strong>How many times can I download a game?
                </strong>
                <p className="sub-description">The number of times you can download a game depends on the platform where the code is activated. However, it's very common for games to be able to be downloaded as many times as you want as you are the owner of the product when you activate it. For example, if you activate a game on Steam, you will be able to download it as many times as you want on any device that is linked to your Steam account.
                </p>
              </li>

              <li className="sub-list-item">
                <strong>Is the preorder bonus or beta access included?
                </strong>
                <p className="sub-description">We always try to include any preorder bonuses or beta access that are available for a game, but sometimes it may not be possible for us to obtain them.The availability of preorder bonuses or beta access is clearly stated on the product page, so please check the product details before making your purchase.If you are unsure about whether a particular bonus or access is included with your purchase, please feel free to contact us and we will be happy to confirm for you. Please note that in some cases, the preorder bonus or beta access may be provided by the developer or publisher at a later date and may not be immediately available upon purchase.</p>
              </li>

              <li className="sub-list-item">
                <strong>Product out of stock or not in our catalog</strong>
                <p className="sub-description">We strive to have a wide selection of products available for purchase, however, sometimes products may become temporarily out of stock or no longer available for purchase. We do not want to create false hope for customers, so we do not create product pages for items that we are uncertain about being able to provide in the future. We strongly recommend using the "notify me when back in stock" feature on our website, or checking back regularly for updates on product availability. If you are looking for a specific product that is not currently listed on our website, please don't hesitate to contact us, we'll be happy to assist you and provide more information if possible.
                </p>
              </li>

              <li className="sub-list-item">
                <strong>Which products are compatible with what?
                </strong>
                <p className="sub-description">Every product is designed to be activated on a specific platform, such as Steam, Origin, Battlenet, and more. All the information you need to know about the product's compatibility can be found on the product page. However, if you have any doubts or questions, please don't hesitate to reach out to our customer support team for assistance. They will be more than happy to help you</p>
              </li>

              <li className="sub-list-item">
                <strong>Information about the content of a product</strong>
                <p className="sub-description">All the information and content that a product should contain should be displayed clearly on the product page. However, if you have any doubts or notice any missing information, please don't hesitate to contact us. We'll be happy to assist you and provide any information you need..</p>
              </li>

              
            </ul>
          )}
        </li>
      </ul>
      <button onClick={goToContactPage} className="contact-button">
      <FontAwesomeIcon icon={faInfoCircle} /> Return to the other Issues
        </button> {/* Add the contact button */}
    </div>
  );
};

export default OrderProductList;
