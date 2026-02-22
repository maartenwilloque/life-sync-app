import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, ShoppingBag, Trash } from 'lucide-react';
import { useStore } from '../hooks/useStore';

export const ShoppingView: React.FC = () => {
  const { shoppingList, addShoppingItem, toggleShoppingItem, removeShoppingItem, clearShoppingCompleted } = useStore();
  const [newItemText, setNewItemText] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    addShoppingItem(newItemText);
    setNewItemText('');
    setIsFormOpen(false);
  };

  const completedCount = shoppingList.filter(item => item.completed).length;
  const activeItems = shoppingList.filter(item => !item.completed);
  const completedItems = shoppingList.filter(item => item.completed);

  return (
    <div className="md:ml-20 pb-20 md:pb-0">
      {/* Add Item Form */}
      <div className="bg-bg-card border-b border-border-subtle p-4 md:p-6">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="w-full md:w-auto flex items-center gap-2 bg-acid-green hover:bg-yellow-300 text-bg-void px-4 py-2 rounded-md font-bold transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>

        {isFormOpen && (
          <form onSubmit={handleAddItem} className="mt-4 space-y-4 p-4 bg-bg-elevated rounded-lg">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Item Name</label>
              <input
                type="text"
                value={newItemText}
                onChange={e => setNewItemText(e.target.value)}
                placeholder="e.g., Milk, Bread, Vegetables..."
                className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary placeholder-text-muted"
                autoFocus
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-acid-green hover:bg-yellow-300 text-bg-void px-4 py-2 rounded-md font-bold transition-colors"
              >
                Add Item
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="flex-1 bg-bg-elevated hover:bg-bg-card text-text-primary px-4 py-2 rounded-md font-medium transition-colors border border-border-subtle"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Content Area */}
      <main className="p-4 md:p-6 pb-20 md:pb-8">
        {shoppingList.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-text-muted mb-4" />
            <p className="text-text-secondary text-lg">Shopping list is empty</p>
            <p className="text-text-muted text-sm">Start by adding items you need to buy</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-bg-card p-4 rounded-lg shadow-sm border border-border-subtle">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-text-primary">Progress</p>
                <p className="text-sm text-text-secondary">{completedCount} of {shoppingList.length} items</p>
              </div>
              <div className="w-full bg-bg-elevated rounded-full h-2">
                <div
                  className="bg-acid-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / shoppingList.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Active Items */}
            {activeItems.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-text-primary mb-3">To Buy</h2>
                <div className="space-y-2">
                  {activeItems.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-bg-card rounded-md border border-border-subtle hover:border-border-mid transition-colors"
                    >
                      <button
                        onClick={() => toggleShoppingItem(item.id)}
                        className="text-text-muted hover:text-acid-green transition-colors flex-shrink-0"
                      >
                        <Circle className="w-6 h-6" />
                      </button>
                      <span className="flex-1 text-text-primary">{item.name}</span>
                      <button
                        onClick={() => removeShoppingItem(item.id)}
                        className="text-text-muted hover:text-crimson transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Completed Items */}
            {completedItems.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-text-primary">Completed</h2>
                  <button
                    onClick={clearShoppingCompleted}
                    className="text-sm text-crimson hover:text-crimson-glow flex items-center gap-1 transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                    Clear
                  </button>
                </div>
                <div className="space-y-2">
                  {completedItems.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-bg-elevated rounded-md border border-border-subtle opacity-60"
                    >
                      <button
                        onClick={() => toggleShoppingItem(item.id)}
                        className="text-acid-green hover:text-yellow-300 transition-colors flex-shrink-0"
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </button>
                      <span className="flex-1 line-through text-text-muted">{item.name}</span>
                      <button
                        onClick={() => removeShoppingItem(item.id)}
                        className="text-text-muted hover:text-crimson transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
