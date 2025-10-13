import { getLandProject, getLoggedInUser } from '@/lib/Appwrite/api';
import { DataTable } from './overview/data-table';
import { columns } from './overview/columns';
import Header from './overview/Header';
const Projects = async() => {
   const user = await getLoggedInUser()
   const createdProjects = await getLandProject(`${user.email}`)
   console.log(createdProjects)
  return (
  <div className=' flex max-w-5xl mx-auto flex-col items-center   justify-center py-10  gap-y-2'>
    <Header />
    {/* @ts-ignore */}
    <DataTable data={createdProjects} columns={columns}/>;
  </div>)
};

export default Projects;
