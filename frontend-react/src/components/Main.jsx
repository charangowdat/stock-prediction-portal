import React from 'react'

const main = () => {
  return (
    <>
      <div className='container'>
        <div className='text-center p-5 bg-light-dark'>
          <h1 className='text-light'>Stock Prediction Portal</h1>
          <p className='text-light'>This stock prediction application utilizes machine learning techniques, specifically employing Keras, and LSTM model, integrated within the Django framework. It forecasts future stock prices by analyzing 100-day and 200-day moving averages, essential indicators widely used by stock analysts to inform trading and investment decisions.</p>
          <a className='btn btn-info' href=''>Login</a>&nbsp;
        </div>
      </div>
    </>
  )
}

export default main
