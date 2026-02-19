import { Modal } from 'shared/ui/Modal/Modal'
import { LoginForm } from '../LoginForm/LoginForm'

interface LoginModalProps {
    className?: string,
    isOpen: boolean, 
    onClose: () => void
}

export const LoginModal = (props: LoginModalProps) => {
    const {className, ...otherProps} = props
    return(
        <Modal className={className} {...otherProps} lazy>
            <LoginForm />
        </Modal>
    )
}