import React from 'react'
import { motion } from 'framer-motion';
import SplitProjectView from './SplitProjectView'

interface ClickedState {
  clicked: boolean;
  setClicked: (id: boolean) => void;
}
interface NavItem {
  id: string;
  label: string;
}

interface SplitViewProps extends ClickedState {
  activeItem: string | null;
}

function SplitView({ clicked, setClicked, activeItem }: SplitViewProps) {
  const [project, setProject] = React.useState<string>('Drafted');


  return (
    <div className='w-screen h-screen '>
      {/* tab and work name title */}
      {clicked && (
              <motion.div
        className="absolute top-5 left-10 z-10 flex flex-row items-center gap-2"
        style={{ pointerEvents: 'none' }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className='uppercase text-black text-xs'>{activeItem} / </h1>
        <h1 className='uppercase text-gray-300 text-xs'>{project}</h1>
      </motion.div>
      )}

      <SplitProjectView clicked={clicked} setClicked={setClicked} activeItem={activeItem} />
    </div>
  )
}

export default SplitView
