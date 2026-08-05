import { Helmet } from 'react-helmet';

const jobs = [
  {
    id: 1,
    title: 'Production Manager',
    location: 'Addis Ababa',
    type: 'Full-time',
    description: 'Oversee daily production operations and ensure efficiency and quality standards.',
  },
  {
    id: 2,
    title: 'Quality Control Engineer',
    location: 'Mugher Factory',
    type: 'Full-time',
    description: 'Conduct laboratory tests and ensure all products meet quality specifications.',
  },
  {
    id: 3,
    title: 'Sales Representative',
    location: 'Addis Ababa',
    type: 'Full-time',
    description: 'Build client relationships and drive sales growth across Ethiopia.',
  },
  {
    id: 4,
    title: 'Maintenance Technician',
    location: 'Mugher Factory',
    type: 'Full-time',
    description: 'Maintain and repair production machinery to ensure uptime and safety.',
  },
];

export default function Careers() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Helmet><title>Careers | Mugher Cement</title></Helmet>
      <h1 className="text-4xl font-bold text-brand mb-6">Join Our Team</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        At Mugher Cement, our people are our greatest asset. We are always looking for talented,
        dedicated professionals to join us in building Ethiopia's future.
      </p>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-brand">{job.title}</h3>
                <p className="text-gray-600">{job.location} | {job.type}</p>
                <p className="text-gray-700 mt-2">{job.description}</p>
              </div>
              <button className="bg-secondary text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition mt-4 md:mt-0">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-brand mb-2">Don't see the right role?</h3>
        <p className="text-gray-700">
          Send your CV to <span className="text-secondary font-medium">careers@mughercement.com</span>
          {' '}and we'll keep you in mind for future opportunities.
        </p>
      </div>
    </div>
  );
}