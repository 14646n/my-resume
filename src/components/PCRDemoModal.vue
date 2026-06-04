<!-- src/components/PCRDemoModal.vue -->
<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const activeTab = ref("general");

interface Tab {
  id: string;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: "general", label: "General", icon: "⚙️" },
  { id: "patterns", label: "Patterns", icon: "📊" },
  { id: "phases", label: "Phases", icon: "🔬" },
  { id: "atoms", label: "Atoms", icon: "⚛️" },
];

const close = () => emit("update:modelValue", false);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="close"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in-up"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-750"
          >
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                PCR Editor — Демо превью
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                FullProf Suite control file editor
              </p>
            </div>
            <button
              @click="close"
              class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <svg
                class="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Tabs -->
          <div
            class="flex gap-1 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
              ]"
            >
              <span>{{ tab.icon }}</span>
              {{ tab.label }}
            </button>
          </div>

          <!-- Demo Content -->
          <div class="p-6 overflow-y-auto max-h-[60vh]">
            <!-- General Tab -->
            <div
              v-if="activeTab === 'general'"
              class="space-y-6 animate-fade-in-up"
            >
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Comment / Title</label
                  >
                  <input
                    type="text"
                    value="WDICVOL06/14 solution"
                    disabled
                    class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Job Type</label
                  >
                  <select
                    disabled
                    class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option>Rietveld Refinement</option>
                  </select>
                </div>
              </div>

              <div class="grid md:grid-cols-3 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Cycles</label
                  >
                  <input
                    type="number"
                    value="10"
                    disabled
                    class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Convergence (ε)</label
                  >
                  <input
                    type="number"
                    value="0.30"
                    step="0.01"
                    disabled
                    class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Radiation</label
                  >
                  <input
                    type="text"
                    value="Cu Kα (1.540600 Å)"
                    disabled
                    class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                </div>
              </div>

              <!-- Visual Preview -->
              <div
                class="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-750 rounded-xl border border-blue-100 dark:border-gray-600"
              >
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  📄 Preview PCR snippet:
                </p>
                <pre
                  class="text-xs font-mono bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto"
                >
COMM WDICVOL06/14 solution
!Job Npr Nph Nba Nex Nsc Nor Dum Iwg Ilo Ias Res Ste Nre Cry Uni Cor Opt Aut
   0   7   1   0   2   0   1   1   0   0   1   0   0   0   0   0   0   1   1
! Lambda1  Lambda2    Ratio
 1.540600 1.544390  0.50000
!NCY  Eps  R_at  R_an  R_pr  R_gl     Thmin       Step       Thmax
 10  0.30  1.00  1.00  1.00  1.00     10.0000   0.030012    80.0000
                </pre>
              </div>
            </div>

            <!-- Phases Tab (simplified) -->
            <div
              v-if="activeTab === 'phases'"
              class="space-y-4 animate-fade-in-up"
            >
              <div class="flex items-center justify-between">
                <h4 class="font-semibold text-gray-900 dark:text-white">
                  Crystal Phases
                </h4>
                <button
                  class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  + Add Phase
                </button>
              </div>

              <div
                class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                <table class="w-full text-sm">
                  <thead class="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th
                        class="px-4 py-3 text-left text-gray-600 dark:text-gray-300"
                      >
                        Phase
                      </th>
                      <th
                        class="px-4 py-3 text-left text-gray-600 dark:text-gray-300"
                      >
                        Space Group
                      </th>
                      <th
                        class="px-4 py-3 text-left text-gray-600 dark:text-gray-300"
                      >
                        a (Å)
                      </th>
                      <th
                        class="px-4 py-3 text-left text-gray-600 dark:text-gray-300"
                      >
                        b (Å)
                      </th>
                      <th
                        class="px-4 py-3 text-left text-gray-600 dark:text-gray-300"
                      >
                        c (Å)
                      </th>
                      <th
                        class="px-4 py-3 text-left text-gray-600 dark:text-gray-300"
                      >
                        Refine
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    <tr
                      class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition"
                    >
                      <td
                        class="px-4 py-3 font-medium text-gray-900 dark:text-white"
                      >
                        Phase 1
                      </td>
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                        I 4/m
                      </td>
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                        5.5789
                      </td>
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                        5.5789
                      </td>
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                        15.8458
                      </td>
                      <td class="px-4 py-3">
                        <span
                          class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full"
                          >a,b,c</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Placeholder for other tabs -->
            <div
              v-if="['patterns', 'atoms'].includes(activeTab)"
              class="text-center py-12 animate-fade-in-up"
            >
              <div
                class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4 animate-float"
              >
                <svg
                  class="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <p class="text-gray-500 dark:text-gray-400">
                Интерфейс в разработке — полный функционал доступен в
                репозитории
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
          >
            <div class="flex gap-2">
              <button
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
              >
                ← Previous
              </button>
              <button
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
              >
                Next →
              </button>
            </div>
            <button
              @click="close"
              class="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition hover-pulse"
            >
              Закрыть демо
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .animate-fade-in-up,
.modal-leave-to .animate-fade-in-up {
  transform: translateY(20px);
}

/* Custom scrollbar for modal content */
:deep(.overflow-y-auto) {
  scrollbar-width: thin;
  scrollbar-color: #6366f1 #f1f5f9;
}
:deep(.overflow-y-auto::-webkit-scrollbar) {
  width: 6px;
}
:deep(.overflow-y-auto::-webkit-scrollbar-track) {
  background: #f1f5f9;
  border-radius: 3px;
}
:deep(.overflow-y-auto::-webkit-scrollbar-thumb) {
  background: #6366f1;
  border-radius: 3px;
}
:deep(.dark .overflow-y-auto::-webkit-scrollbar-track) {
  background: #1f2937;
}
:deep(.dark .overflow-y-auto::-webkit-scrollbar-thumb) {
  background: #818cf8;
}
</style>
