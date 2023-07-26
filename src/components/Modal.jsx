import {motion, AnimatePresence} from 'framer-motion'

const Modal = (props) => {


    return (
        <AnimatePresence>
            {props.open && (
                <>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: {duration: 0.3}}}
                        exit={{opacity: 0, transition: {delay: 0.3}}}   
                        className='modal-backdrop' 
                        onClick={props.closeClick}
                    />
                    <motion.div
                        initial={{y: -100, opacity: 0}}
                        animate={{y: 0, opacity: 1, transition: {duration: 0.3}}}
                        exit={{y: 100, opacity: 0, transition: {delay: 0.3}}}
                        className='modal-content-wrapper'
                    >
                        <motion.div
                            initial={{scale: 0}}
                            animate={{scale: 1, transition: {delay: 0.3}}}   
                            exit={{scale: 0, transition: {duration: 0.3}}} 
                            className='modal-content'
                        >
                            {props.children}
                        </motion.div>
                    </motion.div>
                </>
            )}
            
        </AnimatePresence>
    )
}

export default Modal;