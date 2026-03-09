import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { User, Target, Trash2, AlertTriangle } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { userName, userEmail, goalName, goalAmount, resetAccount } = useAppStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    resetAccount();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <div className="safe-area-top bg-gradient-hero px-6 pb-6 pt-10">
        <div className="mx-auto max-w-sm">
          <h1 className="text-xl font-extrabold text-foreground">Configurações</h1>
        </div>
      </div>

      <div className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-sm space-y-4">
          {/* Profile */}
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-light">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Perfil</h2>
            </div>
            <p className="text-base font-bold text-foreground">{userName}</p>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>

          {/* Goal */}
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-light">
                <Target className="h-5 w-5 text-foreground" />
              </div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Meta</h2>
            </div>
            <p className="text-base font-bold text-foreground">{goalName}</p>
            <p className="text-sm text-muted-foreground">R$ {goalAmount.toFixed(2)}</p>
          </div>

          {/* Danger zone */}
          <div className="pt-6">
            <motion.button
              onClick={() => setShowDeleteModal(true)}
              className="tap-target flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-destructive py-4 text-base font-bold text-destructive"
              whileTap={{ scale: 0.97 }}
            >
              <Trash2 className="h-5 w-5" />
              Exclusão de Conta
            </motion.button>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              className="w-full max-w-sm rounded-3xl bg-card p-6 shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
                <AlertTriangle className="h-7 w-7 text-destructive" />
              </div>
              <h3 className="mb-2 text-xl font-extrabold text-foreground">Excluir conta?</h3>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                Todos os seus dados, metas e histórico serão apagados permanentemente. Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowDeleteModal(false)}
                  className="tap-target flex-1 rounded-xl bg-muted/20 py-3 text-sm font-bold text-foreground"
                  whileTap={{ scale: 0.97 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={handleDelete}
                  className="tap-target flex-1 rounded-xl bg-destructive py-3 text-sm font-bold text-destructive-foreground"
                  whileTap={{ scale: 0.97 }}
                >
                  Excluir tudo
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
