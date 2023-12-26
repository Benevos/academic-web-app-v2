import { MathJax } from 'better-react-mathjax'
import React from 'react'

function Previsualization({title='Previsualization', value='Some text'}) {
  return (
    <div className='previusalization'>
        <h3 className='previusalization-title'>{title}</h3>
        <MathJax>
          <p className='previsualization-paragraph'>{value}</p>
        </MathJax>
    </div>
  )
}

export default Previsualization