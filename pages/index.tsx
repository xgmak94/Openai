import Chat from '../components/Chat/Chat';
import SideBar from '../components/SideBar/SideBar';

export default function Home() {
  return (
    <div className="flex">
      <SideBar />
      <Chat />
    </div>
  );
}
