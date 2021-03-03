import React from 'react'

/**
 * Provides children to a component's slots.
 *
 * @param {string} name - The name of the slot
 *
 * @example
 * export default function () {
 *   return (
 *     <MyComponent>
 *       <Slot name="foo"><span>foo</span></Slot>
 *       <Slot name="bar"><span>bar</span></Slot>
 *       <span>baz</span>
 *     </MyComponent>
 *   )
 * })
 */

export function Slot ({ name, children }) {
  return (
    <React.Fragment key={`slot#${name}`}>
      {children}
    </React.Fragment>
  )
}

/**
 * Finds root-level instances of slot components and maps their children to an object.
 * 
 * @param {object|array} children - Component children
 * 
 * @return {array} Array containing the slot map, and the default slot
 *
 * @example
 * export default function MyComponent ({ children }) {
 *   const [ slots, defaultSlot ] = findSlots(children)
 * 
 *   return (
 *     <div>
 *       <div>{slots.foo}</div>
 *       <div>{slots.bar}</div>
 *       <div>{defaultSlot}</div>
 *     </div>
 *   )
 * })
 */

export function findSlots (children) {
  if (!Array.isArray(children)) children = [children]
  else children = children.slice()

  const slots = children.reduce((slots, child, i) => {
    if (child.type === Slot) {
      if (!child.props.name) throw new Error('Prop "name" is required for Slot.')
      slots[child.props.name] = child.props.children
      children[i] = null
    }
    return slots
  }, {})
  slots.default = children.filter((child) => child !== null)

  return slots
}
