import React, { useState } from 'react';
import { 
  CheckSquare, 
  List, 
  Kanban, 
  Calendar as CalendarIcon, 
  BarChart2, 
  Plus, 
  Search, 
  Clock, 
  User, 
  AlertCircle, 
  Check, 
  Filter, 
  Trash2, 
  ChevronRight,
  Layers
} from 'lucide-react';
import { TaskItem } from '../types';

interface ProTaskManagerSectionProps {
  tasks: TaskItem[];
  onAddTask: (task: TaskItem) => void;
  onUpdateTask: (task: TaskItem) => void;
  onDeleteTask: (taskId: string) => void;
}

export const ProTaskManagerSection: React.FC<ProTaskManagerSectionProps> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'board' | 'calendar' | 'gantt'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  // New Task Modal State
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState<'Project' | 'Sales' | 'Administrative' | 'Finance' | 'HR' | 'Marketing'>('Project');
  const [priority, setPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [assignee, setAssignee] = useState('Alex Rivera');
  const [estHours, setEstHours] = useState(8);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'ALL' || t.category === filterCategory;
    const matchesPrio = filterPriority === 'ALL' || t.priority === filterPriority;
    return matchesSearch && matchesCat && matchesPrio;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTask: TaskItem = {
      id: `TASK-${(tasks.length + 101).toString().padStart(4, '0')}`,
      title,
      description: desc,
      category,
      status: 'To Do',
      priority,
      assignee,
      dueDate,
      estHours,
      actHours: 0,
      subtasks: [
        { id: 'st-1', title: 'Initial setup & validation', done: false }
      ],
      labels: [category]
    };

    onAddTask(newTask);
    setTitle('');
    setDesc('');
    setShowTaskModal(false);
  };

  const handleToggleSubtask = (taskId: string, subId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedSubtasks = task.subtasks.map((s) =>
      s.id === subId ? { ...s, done: !s.done } : s
    );

    onUpdateTask({ ...task, subtasks: updatedSubtasks });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm text-slate-800">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-slate-900 text-base">Enterprise Multi-Department Task Management</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              List view, Kanban view, Calendar view, and Gantt timeline tracking
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-mono">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>

              <button
                onClick={() => setViewMode('board')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'board' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Board</span>
              </button>

              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'calendar' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Calendar</span>
              </button>

              <button
                onClick={() => setViewMode('gantt')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'gantt' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Gantt</span>
              </button>
            </div>

            <button
              onClick={() => setShowTaskModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-semibold cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="Project">Project</option>
              <option value="Sales">Sales</option>
              <option value="Administrative">Administrative</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-semibold cursor-pointer"
            >
              <option value="ALL">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* VIEW 1: LIST VIEW */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <th className="p-3">Task ID</th>
                  <th className="p-3">Title & Subtasks</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Assignee</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Est / Act Hours</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-indigo-700">{task.id}</td>
                    <td className="p-3 font-sans">
                      <div className="font-bold text-slate-900">{task.title}</div>
                      <div className="text-[11px] text-slate-500">{task.description}</div>
                      {task.subtasks.length > 0 && (
                        <div className="mt-1.5 space-y-1">
                          {task.subtasks.map((st) => (
                            <label key={st.id} className="flex items-center gap-1.5 text-[10px] text-slate-600 font-mono cursor-pointer">
                              <input
                                type="checkbox"
                                checked={st.done}
                                onChange={() => handleToggleSubtask(task.id, st.id)}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className={st.done ? 'line-through text-slate-400' : ''}>{st.title}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold text-[10px]">
                        {task.category}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={task.status}
                        onChange={(e) => onUpdateTask({ ...task, status: e.target.value as any })}
                        className="bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded font-bold text-[10px] cursor-pointer"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">Review</option>
                        <option value="Done">Done</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                        task.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">{task.assignee}</td>
                    <td className="p-3 text-slate-600">{task.dueDate}</td>
                    <td className="p-3 font-bold text-slate-900">{task.estHours}h / {task.actHours}h</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* VIEW 2: KANBAN BOARD VIEW */}
        {viewMode === 'board' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            {(['To Do', 'In Progress', 'Review', 'Done'] as const).map((col) => (
              <div key={col} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="font-bold text-slate-800 border-b border-slate-200 pb-1.5 flex justify-between">
                  <span>{col}</span>
                  <span className="bg-slate-200 px-1.5 py-0.5 rounded font-bold">
                    {filteredTasks.filter((t) => t.status === col).length}
                  </span>
                </div>
                {filteredTasks
                  .filter((t) => t.status === col)
                  .map((task) => (
                    <div key={task.id} className="bg-white border border-slate-200 rounded-lg p-2.5 space-y-1.5 shadow-xs">
                      <div className="font-bold text-indigo-700 text-[10px]">{task.id}</div>
                      <div className="font-bold text-slate-900 font-sans">{task.title}</div>
                      <div className="text-slate-500 text-[10px]">{task.assignee} • {task.estHours}h</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CALENDAR VIEW */}
        {viewMode === 'calendar' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs space-y-3">
            <div className="font-bold text-slate-900 text-sm">Task Calendar (July 2026)</div>
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-500">
              <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
            </div>
            <div className="grid grid-cols-7 gap-2 h-64 text-slate-800">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-lg p-1.5 text-[10px] flex flex-col justify-between">
                  <span className="font-bold text-slate-400">{i + 1}</span>
                  {i === 15 && <span className="bg-indigo-100 text-indigo-800 px-1 rounded truncate">TASK-0101 Due</span>}
                  {i === 20 && <span className="bg-emerald-100 text-emerald-800 px-1 rounded truncate">TASK-0102 Due</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: GANTT CHART TIMELINE */}
        {viewMode === 'gantt' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs space-y-3">
            <div className="font-bold text-slate-900 text-sm">Gantt Project Timeline</div>
            <div className="space-y-2">
              {filteredTasks.map((t, idx) => (
                <div key={t.id} className="flex items-center gap-4">
                  <div className="w-32 font-bold text-slate-800 truncate">{t.id}: {t.title}</div>
                  <div className="flex-1 bg-slate-200 rounded-full h-3 relative overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${(idx + 3) * 18}%`, marginLeft: `${idx * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CREATE TASK MODAL */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 text-slate-800">
            <h3 className="font-bold text-slate-900 text-base">Create New Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Deploy Apps Script Webhook"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                >
                  <option value="Project">Project</option>
                  <option value="Sales">Sales</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  >
                    <option value="Critical">🔴 Critical</option>
                    <option value="High">🟠 High</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Low">🟢 Low</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Est Hours</label>
                  <input
                    type="number"
                    value={estHours}
                    onChange={(e) => setEstHours(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
