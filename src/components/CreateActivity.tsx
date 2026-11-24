import { useState, useRef } from 'react'
import {
  X, Image, Video, FileText, Mic, Plus, Upload,
  Download,
  Users, Building2, GraduationCap, Briefcase, Award,
  BookOpen, Trash2, Check, Lock, Globe, UserCheck
} from './ui/icons'
import { useToast } from './ui/Toast'

interface CreateActivityProps {
  onClose: () => void
}

type MediaType = 'image' | 'video' | 'audio' | 'pdf' | 'doc' | 'spreadsheet' | 'presentation' | 'epub' | 'zip' | 'research' | 'publication'

interface UploadedFile {
  id: string
  name: string
  type: MediaType
  size: string
  preview?: string
  progress: number
}

const mediaButtons = [
  { type: 'image' as MediaType, icon: Image, label: 'Photo', accept: 'image/*' },
  { type: 'video' as MediaType, icon: Video, label: 'Video', accept: 'video/*' },
  { type: 'audio' as MediaType, icon: Mic, label: 'Audio', accept: 'audio/*' },
  { type: 'pdf' as MediaType, icon: FileText, label: 'PDF', accept: '.pdf' },
  { type: 'doc' as MediaType, icon: FileText, label: 'Document', accept: '.doc,.docx' },
  { type: 'research' as MediaType, icon: BookOpen, label: 'Research', accept: '.pdf,.doc,.docx' },
]

const tagCategories = [
  { key: 'skills', label: 'Skills Used', icon: Award, color: '#1565D8', bg: '#EEF4FF', placeholder: 'e.g. Python, System Design...' },
  { key: 'tools', label: 'Tools Used', icon: Briefcase, color: '#7C3AED', bg: '#EDE9FE', placeholder: 'e.g. Figma, AWS, Git...' },
  { key: 'collaborators', label: 'Collaborators', icon: Users, color: '#16A34A', bg: '#DCFCE7', placeholder: 'Tag people who contributed...', priority: true },
  { key: 'organization', label: 'Organisation', icon: Building2, color: '#0891B2', bg: '#CFFAFE', placeholder: 'Company or NGO...' },
  { key: 'institution', label: 'Institution', icon: GraduationCap, color: '#D97706', bg: '#FEF3C7', placeholder: 'University, school...' },
  { key: 'mentor', label: 'Mentor / Supervisor', icon: UserCheck, color: '#9333EA', bg: '#F3E8FF', placeholder: 'Tag your mentor...' },
]

const visibilityOptions = [
  { value: 'public', label: 'Public', desc: 'Everyone on PROFILE', icon: Globe },
  { value: 'connections', label: 'Connections only', desc: 'Your verified connections', icon: Users },
  { value: 'private', label: 'Private', desc: 'Only you', icon: Lock },
  { value: 'recruiters', label: 'Recruiters + Connections', desc: 'Visible to verified recruiters', icon: Briefcase },
]

const fileTypeIcon: Record<MediaType, typeof Image> = {
  image: Image, video: Video, audio: Mic, pdf: FileText,
  doc: FileText, spreadsheet: FileText, presentation: FileText,
  epub: BookOpen, zip: Briefcase, research: BookOpen, publication: BookOpen,
}

function MediaFileIcon({ type }: { type: MediaType }) {
  const Icon = fileTypeIcon[type]
  return <Icon size={24} className="text-profile-blue" />
}

export default function CreateActivity({ onClose }: CreateActivityProps) {
  const [text, setText] = useState('')
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [tags, setTags] = useState<Record<string, string[]>>({
    skills: ['Python', 'Machine Learning'],
    tools: [],
    collaborators: [],
    organization: [],
    institution: [],
    mentor: [],
  })
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({})
  const [addToCV, setAddToCV] = useState(true)
  const [addToPortfolio, setAddToPortfolio] = useState(false)
  const [visibility, setVisibility] = useState('public')
  const [allowDownload, setAllowDownload] = useState(false)
  const [step, setStep] = useState<'compose' | 'metadata' | 'preview'>('compose')
  const [posting, setPosting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handlePost = () => {
    setPosting(true)
    toast('success', 'Activity published', 'Evidence, attribution, and visibility are being processed in the background.')
    setTimeout(onClose, 250)
  }

  const addMockFile = (type: MediaType) => {
    const mock: UploadedFile = {
      id: Math.random().toString(36).slice(2),
      name: type === 'image' ? 'project-screenshot.png' : type === 'video' ? 'demo-walkthrough.mp4' : type === 'pdf' ? 'research-paper.pdf' : `document.${type}`,
      type,
      size: `${(Math.random() * 20 + 0.5).toFixed(1)} MB`,
      preview: type === 'image' ? 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=200&fit=crop&auto=format' : undefined,
      progress: 100,
    }
    setFiles(f => [...f, mock])
  }

  const removeFile = (id: string) => setFiles(f => f.filter(x => x.id !== id))

  const addTag = (category: string) => {
    const val = (tagInputs[category] || '').trim()
    if (!val) return
    setTags(prev => ({ ...prev, [category]: [...(prev[category] || []), val] }))
    setTagInputs(prev => ({ ...prev, [category]: '' }))
  }

  const removeTag = (category: string, tag: string) => {
    setTags(prev => ({ ...prev, [category]: prev[category].filter(t => t !== tag) }))
  }

  const charCount = text.length
  const maxChars = 3000

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center" onClick={e => e.target === e.currentTarget && onClose()}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full lg:max-w-2xl lg:mx-4 bg-white lg:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col max-h-[92vh] lg:max-h-[88vh]" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            {step !== 'compose' && (
              <button onClick={() => setStep(step === 'metadata' ? 'compose' : 'metadata')} className="text-slate-500 hover:text-slate-700 cursor-pointer p-1.5 rounded-lg hover:bg-slate-100">
                ←
              </button>
            )}
            <h2 className="font-black text-slate-800 text-base" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {step === 'compose' ? 'New Activity' : step === 'metadata' ? 'Professional Metadata' : 'Preview'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Step indicators */}
            <div className="hidden sm:flex items-center gap-1.5">
              {(['compose', 'metadata', 'preview'] as const).map((s, i) => (
                <div key={s} className={`flex items-center gap-1.5 ${i > 0 ? 'ml-1' : ''}`}>
                  {i > 0 && <div className="w-4 h-px bg-slate-200" />}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    step === s ? 'bg-[#1565D8] text-white' : steps_done(s, step) ? 'bg-[#EEF4FF] text-[#1565D8]' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {steps_done(s, step) ? <Check size={10} /> : i + 1}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 cursor-pointer">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {step === 'compose' && (
            <div className="p-5 space-y-4">
              {/* Author */}
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format" alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-bold text-slate-800">James Okafor</div>
                  {/* Visibility picker */}
                  <select
                    value={visibility}
                    onChange={e => setVisibility(e.target.value)}
                    className="text-xs text-[#1565D8] font-semibold bg-[#EEF4FF] border-0 rounded-lg px-2 py-0.5 mt-0.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1565D8]/30"
                  >
                    {visibilityOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Text area */}
              <div className="relative">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Share a project, achievement, certification, or insight with your professional network..."
                  className="w-full min-h-[140px] text-sm text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none leading-relaxed"
                  maxLength={maxChars}
                />
                <div className={`text-right text-xs mt-1 ${charCount > maxChars * 0.9 ? 'text-red-500' : 'text-slate-400'}`}>
                  {charCount}/{maxChars}
                </div>
              </div>

              {/* Uploaded files */}
              {files.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {files.map(file => (
                    <div key={file.id} className="relative border border-slate-100 rounded-xl overflow-hidden group">
                      {file.preview ? (
                        <img src={file.preview} alt={file.name} className="w-full h-28 object-cover" />
                      ) : (
                        <div className="w-full h-24 bg-slate-50 flex flex-col items-center justify-center gap-1">
                          <MediaFileIcon type={file.type} />
                          <span className="text-[10px] text-slate-500 font-medium truncate max-w-[80%]">{file.name}</span>
                          <span className="text-[9px] text-slate-400">{file.size}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button onClick={() => removeFile(file.id)} className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer shadow">
                          <Trash2 size={13} />
                        </button>
                      </div>
                      {file.preview && (
                        <div className="px-2 py-1.5 bg-white border-t border-slate-100">
                          <div className="text-[10px] text-slate-500 truncate">{file.name}</div>
                          <div className="text-[9px] text-slate-400">{file.size}</div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add more */}
                  <button
                    onClick={() => addMockFile('image')}
                    className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#1565D8] hover:bg-[#EEF4FF]/30 transition-all group"
                  >
                    <Plus size={16} className="text-slate-300 group-hover:text-[#1565D8] transition-colors" />
                    <span className="text-[10px] text-slate-400 group-hover:text-[#1565D8] transition-colors">Add more</span>
                  </button>
                </div>
              )}

              {/* Media buttons */}
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Add Media · Max 20 GB per file</div>
                <div className="flex flex-wrap gap-2">
                  {mediaButtons.map(({ type, icon: Icon, label }) => (
                    <button
                      key={type}
                      onClick={() => addMockFile(type)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-[#1565D8] hover:bg-[#EEF4FF] rounded-xl text-xs font-semibold text-slate-600 hover:text-[#1565D8] cursor-pointer transition-all"
                    >
                      <Icon size={12} />
                      {label}
                    </button>
                  ))}
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-[#1565D8] hover:bg-[#EEF4FF] rounded-xl text-xs font-semibold text-slate-600 hover:text-[#1565D8] cursor-pointer transition-all"
                  >
                    <Upload size={12} /> Browse Files
                  </button>
                  <input ref={fileRef} type="file" className="hidden" multiple />
                </div>
              </div>
            </div>
          )}

          {step === 'metadata' && (
            <div className="p-5 space-y-5">
              {/* CV / Portfolio destination */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Add to Profile</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'cv', label: 'Add to CV', checked: addToCV, toggle: () => { setAddToCV(!addToCV); if (!addToCV) setAddToPortfolio(false) } },
                    { key: 'portfolio', label: 'Portfolio', checked: addToPortfolio, toggle: () => { setAddToPortfolio(!addToPortfolio); if (!addToPortfolio) setAddToCV(false) } },
                    { key: 'both', label: 'Both', checked: addToCV && addToPortfolio, toggle: () => { setAddToCV(true); setAddToPortfolio(true) } },
                  ].map(({ key, label, checked, toggle }) => (
                    <button
                      key={key}
                      onClick={toggle}
                      className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all ${
                        checked ? 'border-[#1565D8] bg-[#EEF4FF] text-[#1565D8]' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {checked && <Check size={10} className="inline mr-1" />}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {tagCategories.map(({ key, label, icon: Icon, color, bg, placeholder, priority }) => (
                <div key={key}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: bg }}>
                      <Icon size={11} color={color} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{label}</span>
                    {priority && (
                      <span className="ml-auto text-[10px] bg-[#EEF4FF] text-[#1565D8] px-1.5 py-0.5 rounded-full font-bold">Priority</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(tags[key] || []).map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold" style={{ backgroundColor: bg, color }}>
                        {tag}
                        <button onClick={() => removeTag(key, tag)} className="cursor-pointer opacity-60 hover:opacity-100">
                          <X size={9} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInputs[key] || ''}
                      onChange={e => setTagInputs(p => ({ ...p, [key]: e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag(key))}
                      placeholder={placeholder}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1565D8] focus:ring-1 focus:ring-[#1565D8]/20 bg-white"
                    />
                    <button onClick={() => addTag(key)} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors">
                      <Plus size={13} className="text-slate-600" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Download permissions */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Download Permissions</div>
                <button
                  onClick={() => setAllowDownload(!allowDownload)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all cursor-pointer w-full ${allowDownload ? 'border-[#1565D8] bg-[#EEF4FF]' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <Download size={14} className={allowDownload ? 'text-[#1565D8]' : 'text-slate-400'} />
                  <span className={`text-sm font-semibold ${allowDownload ? 'text-[#1565D8]' : 'text-slate-600'}`}>
                    Allow connections to download
                  </span>
                  <div className={`ml-auto w-9 h-5 rounded-full transition-colors ${allowDownload ? 'bg-[#1565D8]' : 'bg-slate-200'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow mt-0.5 transition-all ${allowDownload ? 'ml-4' : 'ml-0.5'}`} />
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="p-5">
              <div className="bg-[#F8FAFF] rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format" alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-bold text-slate-800">James Okafor</div>
                    <div className="text-xs text-slate-400">Just now · {visibilityOptions.find(v => v.value === visibility)?.label}</div>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {addToCV && <span className="text-[10px] bg-[#EEF4FF] text-[#1565D8] px-2 py-0.5 rounded-full font-bold">CV</span>}
                    {addToPortfolio && <span className="text-[10px] bg-[#EDE9FE] text-[#7C3AED] px-2 py-0.5 rounded-full font-bold">Portfolio</span>}
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  {text || <span className="text-slate-400 italic">No description added yet...</span>}
                </p>
                {files.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {files.slice(0, 2).map(f => (
                      f.preview ? (
                        <img key={f.id} src={f.preview} alt="" className="rounded-xl w-full h-24 object-cover" />
                      ) : (
                        <div key={f.id} className="rounded-xl bg-slate-50 h-20 flex items-center justify-center">
                          <MediaFileIcon type={f.type} />
                        </div>
                      )
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {Object.values(tags).flat().slice(0, 6).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-5 py-4 flex items-center gap-3 shrink-0 bg-white">
          {step === 'compose' && (
            <>
              <div className="flex-1 text-xs text-slate-400">
                {files.length > 0 && `${files.length} file${files.length > 1 ? 's' : ''} attached`}
              </div>
              <button
                onClick={() => setStep('metadata')}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1565D8] hover:bg-[#1255C0] text-white text-sm font-bold rounded-xl cursor-pointer transition-all disabled:opacity-40"
                disabled={!text.trim() && files.length === 0}
              >
                Next: Metadata →
              </button>
            </>
          )}
          {step === 'metadata' && (
            <>
              <div className="flex-1 text-xs text-slate-400">Add professional context to maximise trust signal</div>
              <button onClick={() => setStep('preview')} className="px-5 py-2.5 bg-[#1565D8] hover:bg-[#1255C0] text-white text-sm font-bold rounded-xl cursor-pointer transition-all">
                Preview →
              </button>
            </>
          )}
          {step === 'preview' && (
            <>
              <button onClick={() => setStep('metadata')} className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl cursor-pointer hover:bg-slate-50">
                Edit
              </button>
              <button
                onClick={handlePost}
                disabled={posting}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1565D8] hover:bg-[#1255C0] text-white text-sm font-bold rounded-xl cursor-pointer transition-all disabled:opacity-60"
              >
                {posting ? 'Published' : 'Publish Activity'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function steps_done(s: string, current: string) {
  const order = ['compose', 'metadata', 'preview']
  return order.indexOf(s) < order.indexOf(current)
}
