import { Suspense } from 'react'
import { Modal } from 'shared/ui/Modal/Modal'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'
import { Loader } from 'shared/ui/Loader/Loader'

interface LoginModalProps {
    className?: string,
    isOpen: boolean, 
    onClose: () => void
}

export const LoginModal = (props: LoginModalProps) => {
    const {className, onClose, ...otherProps} = props
    return(
        <Modal className={className} onClose={onClose} {...otherProps} lazy>
            <Suspense fallback={<Loader />} >
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    )
}