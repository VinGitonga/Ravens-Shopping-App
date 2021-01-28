import React from 'react'
import { Icon } from 'semantic-ui-react'

const Rating = ({ value, text, color }) => {
  return (
    <>
      <span>
      <Icon color={color}
             name={
               value >= 1
                 ? 'star'
                 : value >= 0.5
                 ? 'star half outline'
                 : 'star'
             }
            />
      </span>
      <span>
      <Icon color={color}
             name={
               value >= 2
                 ? 'star'
                 : value >= 1.5
                 ? 'star half'
                 : 'star'
             }
            />
      </span>
      <span>
      <Icon color={color}
             name={
               value >= 3
                 ? 'star'
                 : value >= 2.5
                 ? 'star half'
                 : 'star'
             }
            />
      </span>
      <span>
      <Icon color={color}
             name={
               value >= 4
                 ? 'star'
                 : value >= 3.5
                 ? 'star half'
                 : 'star'
             }
            />
      </span>
      <span>
      <Icon color={color}
             name={
               value >= 5
                 ? 'star'
                 : value >= 4.5
                 ? 'star half'
                 : 'star'
             }
            />
      </span>
      <span>{text && text}</span>
    </>
  )
}

Rating.defaultProps = {
  color: 'yellow',
}

export default Rating
