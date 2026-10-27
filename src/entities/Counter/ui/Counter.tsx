
import { Button } from '@/shared/ui/Button'

import { useCounterValue } from '../modal/selectors/getCounterValue/getCounterValue'
import { useCounterActions } from '../modal/slice/counterSlice'

export const Counter = () => {
    const counterValue = useCounterValue()
    const { add, decrement,increment } = useCounterActions()
    const handleIncrement = () => {
        increment()
    }
    const handleDecrement = () => {
        decrement()
    }
    const handleAddFive = () => {
        add(5)
    }
    return(
        <div>
            <h1>{counterValue}</h1>
            <Button onClick={handleIncrement}>increment</Button>
            <Button onClick={handleDecrement}>decrement</Button>
            <Button onClick={handleAddFive}>add five</Button>
        </div>
    )
}