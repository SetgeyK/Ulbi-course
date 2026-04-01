import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AddCommentForm.module.scss'
import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors'
import { Input } from 'shared/ui/Input/Input'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

export interface AddCommentFormProps {
    className?: string,
    onSendComment: (text: string) => void
}

const AddCommentForm = ({ className, onSendComment }: AddCommentFormProps) => {
    const text = useSelector(getAddCommentFormText)
    const error = useSelector(getAddCommentFormError)
    const dispatch = useAppDispatch()

    const reducers: ReducersList = {
        addCommentForm: addCommentFormReducer
    }

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value))
    }, [dispatch])

    const onSendHandler = useCallback(() => {
        onSendComment(text || '')
        onCommentTextChange('')
    }, [text, onSendComment, onCommentTextChange])

    return(
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.addCommentForm, {}, [className])}>
                <Input 
                    className={cls.input}
                    placeholder='Введите текст комментария'
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button 
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSendHandler}
                >
                    Отправить
                </Button>
            </div>
        </DynamicModuleLoader>
    )
}

export default AddCommentForm