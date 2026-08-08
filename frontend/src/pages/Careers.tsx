import { useEffect, useState } from 'react';
import API from '../services/api';
import { Helmet } from 'react-helmet';
import ApplicationModal from '../components/ApplicationModal';
import { Icon } from '../components/common/Icon';
import { FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

interface Job {
  id: number;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  is_active: boolean;
}

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    API.get('/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium font-body">Loading Jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Careers | Mugher Cement</title>
        <meta
          name="description"
          content="Join Mugher Cement – careers, job vacancies, and opportunities in Ethiopia's leading cement manufacturer."
        />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <Icon icon={FaBriefcase} className="text-5xl md:text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-wide">
            Careers at Mugher Cement
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-body max-w-2xl mx-auto mt-4">
            Join our team of dedicated professionals and help us build Ethiopia's future with passion, safety, and innovation.
          </p>
        </div>
      </div>

      {/* Job Listings */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-10">
          <p className="text-gray-600 dark:text-gray-300 font-body">
            {jobs.length} {jobs.length === 1 ? 'position' : 'positions'} available
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700">
            <Icon icon={FaBriefcase} className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-body text-lg">No job vacancies available at the moment.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 font-body mt-2">Check back soon for opportunities.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition border border-slate-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading font-bold text-[#1A3C91] dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 font-body">
                        <span className="flex items-center gap-1">
                          <Icon icon={FaMapMarkerAlt} className="text-[#2EAD32]" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon icon={FaClock} className="text-[#2EAD32]" />
                          {job.type}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 font-body mt-3 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                    <button
                      onClick={() => { setSelectedJob(job); setShowModal(true); }}
                      className="bg-[#2EAD32] hover:bg-emerald-700 dark:bg-[#2EAD32] dark:hover:bg-[#4ADE80] text-white dark:text-gray-900 px-6 py-2.5 rounded-lg font-semibold transition shadow-md whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Alternative Application */}
        <div className="mt-12 bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl border border-slate-200 dark:border-gray-700">
          <h3 className="text-xl font-heading font-bold text-[#1A3C91] dark:text-white mb-2">Don't see the right role?</h3>
          <p className="text-gray-700 dark:text-gray-300 font-body">
            Send your CV to <span className="text-[#2EAD32] font-medium">careers@mughercement.com</span>
            {' '}and we'll keep you in mind for future opportunities.
          </p>
        </div>
      </div>

      {/* Application Modal */}
      {showModal && selectedJob && (
        <ApplicationModal job={selectedJob} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}