import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Clock, 
  User, 
  Calendar, 
  CheckSquare, 
  Paperclip, 
  MessageSquare, 
  AlertTriangle, 
  Edit3, 
  Trash2, 
  Filter, 
  Check, 
  X,
  Tag,
  Search,
  SlidersHorizontal,
  BarChart2,
  TrendingUp,
  Layers,
  ArrowRight,
  ShieldAlert,
  Zap,
  Sparkles,
  Link2
} from 'lucide-react';
import { KanbanCard } from '../types';

interface ProKanbanSectionProps {
  cards: KanbanCard[];
  onAddCard: (card: KanbanCard) => void;
  onMoveCard: (cardId: string, newColumn: string) => void;
  onUpdateCard: (card: KanbanCard) => void;
  onDeleteCard: (cardId: string) => void;
}

export const ProKanbanSection: React.FC<ProKanbanSectionProps> = ({
  cards,
  onAddCard,
  onMoveCard,
  onUpdateCard,
  onDeleteCard
}) => {
  const [selectedBoard, setSelectedBoard] = useState<'lead' | 'dev' | 'task'>('lead');
  const [viewMode, setViewMode] = useState<'kanban' | 'funnel'>('kanban');
  const [selectedCardDetail, setSelectedCardDetail] = useState<KanbanCard | null>(null);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [targetColumnForNew, setTargetColumnForNew] = useState('');

  // Drag & Drop visual feedback state
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('All');

  // Form State for Add Card
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low' | 'Urgent'>('High');
  const [newAssignee, setNewAssignee] = useState('Alex Rivera');
  const [newEstHours, setNewEstHours] = useState(8);

  // Detail Drawer Interactive Sub-States
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [newAttachmentName, setNewAttachmentName] = useState('');
  const [newAttachmentUrl, setNewAttachmentUrl] = useState('');

  // Custom Column Addition
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [newColTitle, setNewColTitle] = useState('');
  const [newColWip, setNewColWip] = useState(5);

  // Board columns state per board type
  const [boardColumns, setBoardColumns] = useState({
    lead: [
      { id: 'New Leads', title: 'New Leads', wip: 10 },
      { id: 'Contacted', title: 'Contacted', wip: 8 },
      { id: 'Proposal Sent', title: 'Proposal Sent', wip: 5 },
      { id: 'Negotiation', title: 'Hot Lead / Demo', wip: 4 },
      { id: 'Won', title: 'Converted Client', wip: 0 }
    ],
    dev: [
      { id: 'Backlog', title: 'Backlog', wip: 15 },
      { id: 'Discovery', title: 'Discovery & Audit', wip: 6 },
      { id: 'Development', title: 'Development', wip: 5 },
      { id: 'Testing', title: 'Testing & QA', wip: 3 },
      { id: 'Deployment', title: 'Deployment', wip: 2 },
      { id: 'Done', title: 'Done', wip: 0 }
    ],
    task: [
      { id: 'To Do', title: 'To Do', wip: 10 },
      { id: 'In Progress', title: 'In Progress', wip: 5 },
      { id: 'Review', title: 'Review', wip: 3 },
      { id: 'Done', title: 'Completed', wip: 0 }
    ]
  });

  const currentColumns = boardColumns[selectedBoard];

  // Filtering cards
  const activeCards = cards.filter((c) => {
    if (c.board !== selectedBoard) return false;
    if (priorityFilter !== 'All' && c.priority !== priorityFilter) return false;
    if (assigneeFilter !== 'All' && c.assignee !== assigneeFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(term);
      const matchDesc = (c.description || '').toLowerCase().includes(term);
      const matchAssignee = c.assignee.toLowerCase().includes(term);
      const matchId = c.id.toLowerCase().includes(term);
      if (!matchTitle && !matchDesc && !matchAssignee && !matchId) return false;
    }
    return true;
  });

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData('text/plain', cardId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedCardId(cardId);
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumnId !== colId) {
      setDragOverColumnId(colId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, colId: string) => {
    // Only clear if leaving the main container
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setDragOverColumnId(null);
  };

  const handleDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain') || draggedCardId;
    if (cardId) {
      onMoveCard(cardId, colId);
    }
    setDraggedCardId(null);
    setDragOverColumnId(null);
  };

  // Create Card Handler
  const handleCreateCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newCard: KanbanCard = {
      id: `CARD-${Date.now().toString().slice(-4)}`,
      title: newTitle,
      description: newDesc,
      board: selectedBoard,
      column: targetColumnForNew || currentColumns[0].id,
      priority: newPriority,
      assignee: newAssignee,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      timeEstimate: newEstHours,
      timeLogged: 0,
      labels: [{ name: selectedBoard.toUpperCase(), color: 'bg-indigo-500' }],
      checklists: [
        { id: 'chk-1', text: 'Initial specification review', done: false },
        { id: 'chk-2', text: 'Execution & verification', done: false }
      ],
      attachments: [],
      comments: []
    };

    onAddCard(newCard);
    setNewTitle('');
    setNewDesc('');
    setShowAddCardModal(false);
  };

  // Add Custom Column
  const handleAddColumnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColTitle) return;

    const newColObj = {
      id: newColTitle.trim(),
      title: newColTitle.trim(),
      wip: newColWip
    };

    setBoardColumns((prev) => ({
      ...prev,
      [selectedBoard]: [...prev[selectedBoard], newColObj]
    }));

    setNewColTitle('');
    setShowAddColumnModal(false);
  };

  // Card Drawer Interactive Controls
  const handleAddSubtask = () => {
    if (!newSubtaskText || !selectedCardDetail) return;
    const updatedChecklists = [
      ...(selectedCardDetail.checklists || []),
      { id: `chk-${Date.now()}`, text: newSubtaskText, done: false }
    ];
    const updatedCard = { ...selectedCardDetail, checklists: updatedChecklists };
    onUpdateCard(updatedCard);
    setSelectedCardDetail(updatedCard);
    setNewSubtaskText('');
  };

  const handleToggleSubtask = (subId: string) => {
    if (!selectedCardDetail) return;
    const updatedChecklists = (selectedCardDetail.checklists || []).map((chk) =>
      chk.id === subId ? { ...chk, done: !chk.done } : chk
    );
    const updatedCard = { ...selectedCardDetail, checklists: updatedChecklists };
    onUpdateCard(updatedCard);
    setSelectedCardDetail(updatedCard);
  };

  const handleLogHours = (hrs: number) => {
    if (!selectedCardDetail) return;
    const newLogged = (selectedCardDetail.timeLogged || 0) + hrs;
    const updatedCard = { ...selectedCardDetail, timeLogged: newLogged };
    onUpdateCard(updatedCard);
    setSelectedCardDetail(updatedCard);
  };

  const handleAddComment = () => {
    if (!newCommentText || !selectedCardDetail) return;
    const updatedCard = {
      ...selectedCardDetail,
      comments: [
        ...(selectedCardDetail.comments || []),
        {
          id: `cmt-${Date.now()}`,
          author: 'Alex Rivera',
          text: newCommentText,
          time: 'Just now'
        }
      ]
    };
    onUpdateCard(updatedCard);
    setSelectedCardDetail(updatedCard);
    setNewCommentText('');
  };

  const handleAddAttachment = () => {
    if (!newAttachmentName || !selectedCardDetail) return;
    const updatedAttachments = [
      ...(selectedCardDetail.attachments || []),
      {
        id: `att-${Date.now()}`,
        name: newAttachmentName,
        url: newAttachmentUrl || 'https://worknet.dev/docs/spec.pdf',
        size: '1.2 MB'
      }
    ];
    const updatedCard = { ...selectedCardDetail, attachments: updatedAttachments };
    onUpdateCard(updatedCard);
    setSelectedCardDetail(updatedCard);
    setNewAttachmentName('');
    setNewAttachmentUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Board Header & Top Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-slate-900 text-base">Interactive Trello / ClickUp Kanban & Funnel Engine</h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
                Live Drag & Drop Enabled
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Drag cards between columns, enforce WIP limits, track subtask completion, log hours, and analyze stage funnel velocity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-mono border border-slate-200">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'kanban' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Kanban Board</span>
              </button>
              <button
                onClick={() => setViewMode('funnel')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'funnel' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Stage Funnel</span>
              </button>
            </div>

            {/* Board Selector Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-mono border border-slate-200">
              <button
                onClick={() => setSelectedBoard('lead')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedBoard === 'lead' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lead Pipeline
              </button>
              <button
                onClick={() => setSelectedBoard('dev')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedBoard === 'dev' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dev Workflow
              </button>
              <button
                onClick={() => setSelectedBoard('task')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedBoard === 'task' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Task Operations
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs pt-1">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter cards by title, description, assignee, or ID..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">🟣 Urgent</option>
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
          </div>

          <div>
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold cursor-pointer"
            >
              <option value="All">All Assignees</option>
              <option value="Alex Rivera">Alex Rivera</option>
              <option value="Sarah Chen">Sarah Chen</option>
              <option value="Marcus Vance">Marcus Vance</option>
              <option value="Elena Rostova">Elena Rostova</option>
            </select>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-mono text-slate-500">
            <span>Showing {activeCards.length} cards across {currentColumns.length} columns</span>
            <button
              onClick={() => setShowAddColumnModal(true)}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Column</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-2">
            {currentColumns.map((col) => {
              const colCards = activeCards.filter((c) => c.column === col.id);
              const isWipExceeded = col.wip > 0 && colCards.length > col.wip;
              const isBeingDraggedOver = dragOverColumnId === col.id;

              return (
                <div
                  key={col.id}
                  onDragOver={(e) => handleDragOver(e, col.id)}
                  onDragLeave={(e) => handleDragLeave(e, col.id)}
                  onDrop={(e) => handleDrop(e, col.id)}
                  className={`border rounded-2xl p-3 flex flex-col min-w-[230px] min-h-[480px] max-h-[680px] transition-all ${
                    isBeingDraggedOver
                      ? 'border-2 border-indigo-500 bg-indigo-50/60 shadow-inner scale-[1.01]'
                      : isWipExceeded
                      ? 'border-amber-400 bg-amber-50/20'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{col.title}</span>
                      <span className="bg-slate-200 text-slate-800 text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold">
                        {colCards.length}
                      </span>
                    </div>

                    {col.wip > 0 && (
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isWipExceeded ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-slate-100 text-slate-600'
                      }`}>
                        WIP: {col.wip}
                      </span>
                    )}
                  </div>

                  {/* WIP Alert Warning */}
                  {isWipExceeded && (
                    <div className="mb-2 p-2 bg-amber-100 border border-amber-300 rounded-lg text-[10px] font-mono text-amber-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>WIP Limit Exceeded ({colCards.length}/{col.wip})</span>
                    </div>
                  )}

                  {/* Cards Container */}
                  <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
                    {colCards.map((card) => {
                      const completedChecklistCount = (card.checklists || []).filter((c) => c.done).length;
                      const totalChecklistCount = (card.checklists || []).length;
                      const isDraggingThisCard = draggedCardId === card.id;

                      return (
                        <div
                          key={card.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, card.id)}
                          onClick={() => setSelectedCardDetail(card)}
                          className={`bg-white border rounded-xl p-3 shadow-xs space-y-2.5 transition-all cursor-grab active:cursor-grabbing group hover:shadow-md ${
                            isDraggingThisCard ? 'opacity-40 border-dashed border-indigo-400' : 'border-slate-200 hover:border-indigo-400'
                          }`}
                        >
                          {/* Header: ID & Priority */}
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                              {card.id}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded font-bold ${
                              card.priority === 'Urgent' ? 'bg-purple-100 text-purple-800' :
                              card.priority === 'High' ? 'bg-red-100 text-red-800' :
                              card.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {card.priority}
                            </span>
                          </div>

                          {/* Title & Desc */}
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs group-hover:text-indigo-600 transition-colors">
                              {card.title}
                            </h4>
                            {card.description && (
                              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                                {card.description}
                              </p>
                            )}
                          </div>

                          {/* Card Meta & Stats */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400" />
                              <span className="truncate max-w-[80px]">{card.assignee}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {totalChecklistCount > 0 && (
                                <span className="flex items-center gap-0.5 text-slate-600" title="Subtasks progress">
                                  <CheckSquare className="w-3 h-3 text-emerald-600" />
                                  <span>{completedChecklistCount}/{totalChecklistCount}</span>
                                </span>
                              )}

                              {card.timeEstimate && (
                                <span className="flex items-center gap-0.5 text-indigo-600 font-bold" title="Hours estimate">
                                  <Clock className="w-3 h-3" />
                                  <span>{card.timeLogged || 0}/{card.timeEstimate}h</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quick Move Action Selector (as Touch/Click Fallback) */}
                          <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-400">Move:</span>
                            <select
                              value={card.column}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => onMoveCard(card.id, e.target.value)}
                              className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-semibold cursor-pointer"
                            >
                              {currentColumns.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.id}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}

                    {colCards.length === 0 && (
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center text-slate-400 text-xs font-mono my-auto">
                        Drag & Drop cards here
                      </div>
                    )}
                  </div>

                  {/* Add Card Button for this Column */}
                  <button
                    onClick={() => {
                      setTargetColumnForNew(col.id);
                      setShowAddCardModal(true);
                    }}
                    className="mt-3 w-full py-2 border border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-xl text-xs font-mono font-semibold text-slate-600 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Card</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: FUNNEL & STAGE METRICS */}
      {viewMode === 'funnel' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-slate-800">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Funnel Stage Velocity & Resource Allocation Analytics</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown of work items, estimated development hours, completed subtasks, and WIP bottleneck risks per stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentColumns.map((col) => {
              const colCards = activeCards.filter((c) => c.column === col.id);
              const totalEst = colCards.reduce((acc, c) => acc + (c.timeEstimate || 0), 0);
              const totalLogged = colCards.reduce((acc, c) => acc + (c.timeLogged || 0), 0);
              const isWipExceeded = col.wip > 0 && colCards.length > col.wip;

              return (
                <div key={col.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <span className="font-bold text-sm text-slate-900">{col.title}</span>
                    <span className="bg-indigo-100 text-indigo-800 font-mono text-xs font-bold px-2 py-0.5 rounded-full">
                      {colCards.length} Cards
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono text-slate-600">
                    <div className="flex justify-between">
                      <span>Work-In-Progress Limit:</span>
                      <span className="font-bold text-slate-900">{col.wip > 0 ? `${col.wip} Cards` : 'Unlimited'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Estimated Hours:</span>
                      <span className="font-bold text-indigo-700">{totalEst} hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Logged Hours:</span>
                      <span className="font-bold text-emerald-700">{totalLogged} hrs</span>
                    </div>
                  </div>

                  {isWipExceeded && (
                    <div className="bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono p-2 rounded-lg font-bold">
                      ⚠️ Bottleneck Warning: Stage capacity exceeded
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: ADD KANBAN CARD */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add New Card to {targetColumnForNew}</h3>
              <button onClick={() => setShowAddCardModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCardSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Card Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Audit API Rate Limiter & Proxies"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-sans"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed breakdown of task requirements..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-sans"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  >
                    <option value="Urgent">🟣 Urgent</option>
                    <option value="High">🔴 High</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Low">🟢 Low</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assignee</label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  >
                    <option value="Alex Rivera">Alex Rivera</option>
                    <option value="Sarah Chen">Sarah Chen</option>
                    <option value="Marcus Vance">Marcus Vance</option>
                    <option value="Elena Rostova">Elena Rostova</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Est. Hours</label>
                  <input
                    type="number"
                    value={newEstHours}
                    onChange={(e) => setNewEstHours(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs cursor-pointer"
                >
                  Create Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOM COLUMN */}
      {showAddColumnModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add Column to {selectedBoard.toUpperCase()}</h3>
              <button onClick={() => setShowAddColumnModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddColumnSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Column Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Legal Review, Final Signoff"
                  value={newColTitle}
                  onChange={(e) => setNewColTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">WIP Limit (0 = Unlimited)</label>
                <input
                  type="number"
                  value={newColWip}
                  onChange={(e) => setNewColWip(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddColumnModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs cursor-pointer"
                >
                  Add Column
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CARD DETAIL DRAWER */}
      {selectedCardDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end">
          <div className="bg-white w-full max-w-lg h-full p-6 overflow-y-auto space-y-6 shadow-2xl border-l border-slate-200 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-mono text-xs border border-indigo-200">
                  {selectedCardDetail.id}
                </span>
                <span className="text-xs text-slate-500 font-mono">in {selectedCardDetail.column}</span>
              </div>
              <button
                onClick={() => setSelectedCardDetail(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Desc */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">{selectedCardDetail.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                {selectedCardDetail.description || 'No detailed description provided.'}
              </p>
            </div>

            {/* Time Tracking Widget */}
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex justify-between items-center font-mono font-bold text-indigo-900">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Time Tracker</span>
                </span>
                <span>
                  {selectedCardDetail.timeLogged || 0} / {selectedCardDetail.timeEstimate || 8} hrs
                </span>
              </div>
              <div className="flex gap-2 text-[11px] font-mono">
                <button
                  onClick={() => handleLogHours(1)}
                  className="bg-white border border-indigo-300 hover:bg-indigo-100 px-2.5 py-1 rounded-md text-indigo-800 font-bold cursor-pointer"
                >
                  +1 hr
                </button>
                <button
                  onClick={() => handleLogHours(2)}
                  className="bg-white border border-indigo-300 hover:bg-indigo-100 px-2.5 py-1 rounded-md text-indigo-800 font-bold cursor-pointer"
                >
                  +2 hrs
                </button>
                <button
                  onClick={() => handleLogHours(4)}
                  className="bg-white border border-indigo-300 hover:bg-indigo-100 px-2.5 py-1 rounded-md text-indigo-800 font-bold cursor-pointer"
                >
                  +4 hrs
                </button>
              </div>
            </div>

            {/* Subtask Checklist Section */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <span>Subtask Checklist</span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  {(selectedCardDetail.checklists || []).filter((c) => c.done).length} / {(selectedCardDetail.checklists || []).length}
                </span>
              </h3>

              <div className="space-y-2 text-xs">
                {(selectedCardDetail.checklists || []).map((chk) => (
                  <label key={chk.id} className="flex items-center gap-2 font-mono text-slate-700 cursor-pointer hover:bg-slate-50 p-1 rounded-md">
                    <input
                      type="checkbox"
                      checked={chk.done}
                      onChange={() => handleToggleSubtask(chk.id)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className={chk.done ? 'line-through text-slate-400' : 'text-slate-800'}>
                      {chk.text}
                    </span>
                  </label>
                ))}
              </div>

              {/* Add New Subtask Item */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add new subtask item..."
                  value={newSubtaskText}
                  onChange={(e) => setNewSubtaskText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
                <button
                  onClick={handleAddSubtask}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* File Attachments */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-amber-600" />
                <span>File Attachments</span>
              </h3>

              <div className="space-y-2 text-xs font-mono">
                {(selectedCardDetail.attachments || []).map((att) => (
                  <div key={att.id} className="bg-slate-50 border border-slate-200 p-2 rounded-lg flex items-center justify-between">
                    <span className="font-bold text-slate-800 truncate max-w-[200px]">{att.name}</span>
                    <a href={att.url} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold flex items-center gap-1">
                      <Link2 className="w-3 h-3" />
                      <span>View</span>
                    </a>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Document name / URL..."
                  value={newAttachmentName}
                  onChange={(e) => setNewAttachmentName(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
                <button
                  onClick={handleAddAttachment}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  Attach
                </button>
              </div>
            </div>

            {/* Comments Thread */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <span>Activity & Comments</span>
              </h3>

              <div className="space-y-2 max-h-48 overflow-y-auto font-sans text-xs">
                {(selectedCardDetail.comments || []).map((cmt) => (
                  <div key={cmt.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                      <span>{cmt.author}</span>
                      <span className="text-slate-400 text-[10px] font-mono">{cmt.time}</span>
                    </div>
                    <p className="text-slate-600 text-xs">{cmt.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Box */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Post
                </button>
              </div>
            </div>

            {/* Delete Card Action */}
            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => {
                  onDeleteCard(selectedCardDetail.id);
                  setSelectedCardDetail(null);
                }}
                className="text-red-600 hover:text-red-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Card</span>
              </button>

              <button
                onClick={() => setSelectedCardDetail(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
