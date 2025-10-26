import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";

enum contentType {
  Youtube = "Youtube",
  Twitter = "Twitter",
  Linkedin = "Linkedin",
}

export function CreateContentModal({ open, onClose }: any) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(contentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) return alert("Please fill out all fields.");

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      { link, title, type },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    onClose();
    window.location.reload();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(56,189,248,0.25)] text-slate-100 backdrop-blur-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <CrossIcon size="md" />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Add New Content
            </h2>

            {/* Input fields */}
            <div className="space-y-4 mb-6">
              <Input ref={titleRef} placeholder="Enter title" type="text" />
              <Input ref={linkRef} placeholder="Paste link" type="text" />
            </div>

            {/* Content type buttons */}
            <div className="flex justify-center gap-3 mb-6">
              {Object.values(contentType).map((t) => (
                <Button
                  key={t}
                  variant={t === type ? "primary" : "secondary"}
                  size="sm"
                  text={t}
                  onClick={() => setType(t)}
                />
              ))}
            </div>

            <Button
              fullWidth
              onClick={addContent}
              variant="primary"
              size="md"
              text="Add Content"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
