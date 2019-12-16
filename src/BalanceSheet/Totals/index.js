import React from 'react'

import './totals.css'

const Totals = ({ totals }) => {
  return (
    <div className='totals'>
      <h1>Totals</h1>
      <div>
        <span>
          <strong>Asset Total</strong>
        </span>
        {totals && typeof totals.assetTotal === 'number' ? (
          <span className='green'>{totals.assetTotal}</span>
        ) : (
          <span>...calculating</span>
        )}
      </div>
      <div>
        <span>
          <strong>Liability Total</strong>
        </span>
        {totals && typeof totals.liabilityTotal === 'number' ? (
          <span className='red'>{totals.liabilityTotal}</span>
        ) : (
          <span>...calculating</span>
        )}
      </div>
      <div>
        <span>
          <strong>Net Worth</strong>
        </span>
        {totals && typeof totals.netWorth === 'number' ? (
          <span className={totals.netWorth >= 0 ? 'green' : 'red'}>
            {totals.netWorth}
          </span>
        ) : (
          <span>...calculating</span>
        )}
      </div>
    </div>
  )
}

export default Totals
