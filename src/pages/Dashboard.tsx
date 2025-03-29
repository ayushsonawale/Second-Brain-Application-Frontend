import { Button } from '../component/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../component/Card';
import { CreateContentModal } from '../component/CreateContentModal';
import { useState } from 'react';
import { Sidebar } from '../component/Sidebar';
import { useContent } from '../hooks/useContent';
import { useParams } from 'react-router-dom';
    
function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();
  const { platform } = useParams();
  
  
  const filteredContents = platform
    ? contents.filter((content) => content.type.toLowerCase() === platform)
    : contents;

  return (
    <div>
      <Sidebar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
        
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className='flex justify-end gap-4'>
          <Button 
            startIcon={<ShareIcon size='md' />} 
            size="sm"
            variant='secondary'
            text='Share Brain'
          />
          <Button 
            onClick={() => setModalOpen(true)}
            startIcon={<PlusIcon size='md' />} 
            size="sm"
            variant='primary' 
            text='Add Content'
          />
        </div>

        <div className='flex flex-wrap gap-5 justify-center pt-8'>
          {filteredContents.length > 0 ? (
            filteredContents.map(({ type, link, title }, index) => (
              <Card key={index} title={title} link={link} type={type} />
            ))
          ) : (
            <p className="text-gray-500 text-lg">No content available for {platform || "all platforms"}.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
