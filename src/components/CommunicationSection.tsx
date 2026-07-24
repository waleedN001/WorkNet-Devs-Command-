import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Video, 
  Calendar, 
  Clock, 
  User, 
  Check, 
  Plus, 
  FileText, 
  ExternalLink, 
  Share2,
  Users
} from 'lucide-react';
import { ChatMessage, MeetingItem } from '../types';

interface CommunicationSectionProps {
  messages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
  meetings: MeetingItem[];
  onScheduleMeeting: (meet: MeetingItem) => void;
}

export const CommunicationSection: React.FC<CommunicationSectionProps> = ({
  messages,
  onSendMessage,
  meetings,
  onScheduleMeeting
}) => {
  const [activeChannel, setActiveChannel] = useState<string>('general');
  const [chatInput, setChatInput] = useState<string>('');

  // Meeting Form State
  const [showMeetModal, setShowMeetModal] = useState(false);
  const [meetTitle, setMeetTitle] = useState('');
  const [meetAgenda, setMeetAgenda] = useState('');
  const [meetAttendees, setMeetAttendees] = useState('alex.rivera@worknetdevs.com, sarah.chen@worknetdevs.com');

  // Minutes Doc Generator Modal
  const [generatedDocUrl, setGeneratedDocUrl] = useState<string | null>(null);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput) return;

    const newMsg: ChatMessage = {
      id: `MSG-${Date.now()}`,
      channelId: activeChannel,
      senderName: 'Alex Rivera',
      senderRole: 'Managing Director',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onSendMessage(newMsg);
    setChatInput('');
  };

  const handleScheduleMeetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetTitle) return;

    // Generate Meet link code
    const meetCode = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
    
    const newMeeting: MeetingItem = {
      id: `MEET-${Date.now().toString().slice(-4)}`,
      title: meetTitle,
      meetLink: `https://meet.google.com/${meetCode}`,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      attendees: meetAttendees.split(',').map((a) => a.trim()),
      status: 'Scheduled',
      agenda: meetAgenda,
      minutesSummary: 'Pending meeting execution'
    };

    onScheduleMeeting(newMeeting);
    setMeetTitle('');
    setMeetAgenda('');
    setShowMeetModal(false);
  };

  const handleGenerateMinutesDoc = (meet: MeetingItem) => {
    const fakeDocId = `1Doc_${Math.random().toString(36).substring(2, 10)}`;
    const docUrl = `https://docs.google.com/document/d/${fakeDocId}/edit`;
    setGeneratedDocUrl(docUrl);
  };

  const channelMessages = messages.filter((m) => m.channelId === activeChannel);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-800">
        <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <h2 className="font-bold text-slate-900 text-base">Real-time Team Communication & Google Meet Alignment</h2>
              <span className="bg-purple-100 text-purple-800 font-mono text-[10px] px-2 py-0.5 rounded-md font-bold">
                Google Meet Synchronized
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live team chat channels, Google Meet auto-link generation, and Google Doc meeting minutes export
            </p>
          </div>

          <button
            onClick={() => setShowMeetModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Schedule Google Meet</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* COLUMN 1 & 2: LIVE TEAM CHAT */}
          <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col h-[480px]">
            {/* Channel Selector Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 text-xs font-mono">
              <span className="text-slate-500 font-bold">Channels:</span>
              {['general', 'projects', 'leads', 'hr'].map((chan) => (
                <button
                  key={chan}
                  onClick={() => setActiveChannel(chan)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeChannel === chan
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  #{chan}
                </button>
              ))}
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 scrollbar-thin">
              {channelMessages.map((msg) => (
                <div key={msg.id} className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span>{msg.senderName}</span>
                      {msg.senderRole && (
                        <span className="bg-indigo-50 text-indigo-700 text-[10px] px-1.5 py-0.2 rounded font-mono">
                          {msg.senderRole}
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 font-mono text-[10px]">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-700 font-sans text-xs leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Message Composer */}
            <form onSubmit={handleSendChat} className="pt-2 border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder={`Message #${activeChannel}...`}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500 font-sans"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>

          {/* COLUMN 3: GOOGLE MEET SCHEDULE */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-indigo-600" />
                  <span>Google Meet Alignment</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">Auto-Synced</span>
              </div>

              <div className="mt-3 space-y-3 font-mono text-xs">
                {meetings.map((meet) => (
                  <div key={meet.id} className="bg-white border border-slate-200 p-3 rounded-xl space-y-2 shadow-xs">
                    <div className="font-bold text-slate-900 font-sans text-xs">{meet.title}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Today • 15-30 mins</span>
                    </div>

                    <a
                      href={meet.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[10px] px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-all"
                    >
                      <Video className="w-3 h-3" />
                      <span>Join Google Meet</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => handleGenerateMinutesDoc(meet)}
                        className="text-[10px] text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Generate Meeting Minutes Doc</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {generatedDocUrl && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono space-y-1">
                <div className="font-bold text-emerald-900">Google Doc Minutes Ready!</div>
                <a
                  href={generatedDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline font-bold flex items-center gap-1 text-[11px]"
                >
                  <span>Open Meeting Minutes Doc</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SCHEDULE MEET MODAL */}
      {showMeetModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 text-slate-800">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Video className="w-5 h-5 text-indigo-600" />
              <span>Schedule Google Meet</span>
            </h3>

            <form onSubmit={handleScheduleMeetSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meeting Title *</label>
                <input
                  type="text"
                  placeholder="e.g. BioSensus Contract & Pipeline Review"
                  value={meetTitle}
                  onChange={(e) => setMeetTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-sans"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attendees (Comma separated emails)</label>
                <input
                  type="text"
                  value={meetAttendees}
                  onChange={(e) => setMeetAttendees(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Agenda & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Review lead status, proposal details, and next milestones..."
                  value={meetAgenda}
                  onChange={(e) => setMeetAgenda(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMeetModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Create & Generate Meet Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
