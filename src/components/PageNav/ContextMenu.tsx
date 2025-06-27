import FlagIcon from '../common/icons/Flag';
import PencilIcon from '../common/icons/Pencil';
import ClipboardIcon from '../common/icons/Clipboard';
import DuplicateIcon from '../common/icons/Duplicate';
import TrashcanIcon from '../common/icons/Trashcan';

import ContextMenuItem from './ContextMenuItem';


export default function ContextMenu() {
  return (
    <div 
      className="context-menu-container absolute top-auto bottom-full left-0 z-100 w-60 mb-4 origin-bottom-left bg-white shadow-lg border border-gray-200 rounded-lg"
      role="menu"
      aria-label="Page settings"
    >
      <div className="flex items-center p-3 text-base capitalize bg-fillout-gray-50 cursor-default rounded-t-lg">
        <span className="font-bold" role="heading" aria-level={3}>Settings</span>
      </div>

      <hr className="border-gray-200" aria-hidden="true"/>
      
      <div className="p-2" role="group" aria-label="Page actions">
        <ContextMenuItem
          icon={<FlagIcon className="text-fillout-gray-400"/>}
          text="Set as first page"
          onClick={() => console.log('Set as first page clicked')}
        />

        <ContextMenuItem
          icon={<PencilIcon className="text-fillout-gray-400"/>}
          text="Rename"
          onClick={() => console.log('Rename clicked')}
        /> 

        <ContextMenuItem
          icon={<ClipboardIcon className="text-fillout-gray-400"/>}
          text="Copy"
          onClick={() => console.log('Copy clicked')}
        />

        <ContextMenuItem
          icon={<DuplicateIcon className="text-fillout-gray-400"/>}
          text="Duplicate"
          onClick={() => console.log('Duplicate clicked')} 
        />

        <hr className="border-gray-200 my-2" aria-hidden="true"/>

        <ContextMenuItem
          icon={<TrashcanIcon className="text-fillout-gray-400"/>}
          text="Delete"
          danger
          onClick={() => console.log('Delete clicked')}
        />
      </div>
    </div>
  );
};