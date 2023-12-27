

export default function Page() {

    return (
        <div>
            <h1>Admin</h1>
            
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">API URL</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" readOnly value={process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : 'invalid env' } />
            </label>
        </div>
    )
}