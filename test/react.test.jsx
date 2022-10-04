import {describe, it, expect, afterEach} from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'

import {Calculator, operations, numbers, equalSign } from '../src/Calculator'

describe('Calculator', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(<Calculator />)
  })

  it('should render title correctly', () => {
    render(<Calculator />)

    screen.getByText('Calculator')
  })
  it('should render numbers', () => {
    render(<Calculator />)

    numbers.forEach(number => {
      screen.getByText(number)
    });
  })
  it('should render four rows', () => {
    render(<Calculator />)

    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(4)
  })
  it('should render operations', () => {
    render(<Calculator />)

    operations.forEach(operation => {
      screen.getByText(operation)
    })
  })
  it('should render equal sign', () => {
    render(<Calculator />)
    screen.getByText('=')
  })
  it('should render clear sign', () => {
    render(<Calculator />)
    screen.getByText('C')
  })
  it('should render an input', () => {
    render(<Calculator />)
    screen.getByRole('textbox')
  })
  it('should show user input after clicking a number', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    fireEvent.click(one)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('1')
  })
  it('should show user input after clicking several numbers', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    fireEvent.click(one)

    const two = screen.getByText('2')
    fireEvent.click(two)

    const three = screen.getByText('3')
    fireEvent.click(three)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('123')
  })
  it('should show user input after clicking numbers and operations', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    fireEvent.click(one)

    const plus = screen.getByText('+')
    fireEvent.click(plus)
    fireEvent.click(one)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('1+1')
  })
  it('should perform calculations based on user input and show the results', () => {
    render(<Calculator />)

    const one = screen.getByText('1')
    fireEvent.click(one)

    const plus = screen.getByText('+')
    fireEvent.click(plus)
    fireEvent.click(one)
    const equal = screen.getByText(equalSign)
    fireEvent.click(equal)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('2')
  })
  it('should clear the input after pressing C button', () => {
    render(<Calculator />)

    const clear = screen.getByText('C')
    fireEvent.click(clear)

  })
})