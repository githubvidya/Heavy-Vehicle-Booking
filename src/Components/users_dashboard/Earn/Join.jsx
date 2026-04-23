import React from 'react'

const Join = () => {
  return (
    <>
      <div className="join">

        <div className="boxInChoose headindS">
          <h1>Earn More Together</h1>
          <span className='borderLine'></span>
        </div>

        <div className="joinSection">
          <h2>Partner With Us & Grow Your Income</h2>
          <p>
            We collaborate with individuals and businesses to create new earning opportunities. 
            Our partner program is designed to help you grow your income through simple, scalable methods.
          </p>
        </div>
        <div className="joinBenefits">
          <div className="benefitCard">
            <h3>Flexible Earning</h3>
            <p>Work at your own pace and earn based on your efforts.</p>
          </div>

          <div className="benefitCard">
            <h3>Transparent System</h3>
            <p>Clear and fair commission structure with no hidden terms.</p>
          </div>

          <div className="benefitCard">
            <h3>Easy Start</h3>
            <p>Simple onboarding process designed for beginners.</p>
          </div>

          <div className="benefitCard">
            <h3>Ongoing Support</h3>
            <p>Get guidance and assistance whenever you need it.</p>
          </div>
        </div>

        <div className="joinSteps">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <span>1</span>
              <p>Sign up as a partner</p>
            </div>

            <div className="step">
              <span>2</span>
              <p>Promote our services</p>
            </div>

            <div className="step">
              <span>3</span>
              <p>Earn commissions on referrals</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="joinCTA">
          <button>Become a Partner</button>
        </div>

      </div>
    </>
  )
}

export default Join