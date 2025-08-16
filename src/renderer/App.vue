

<template>
  <div class="background-container fixed inset-0 z-[-1] pointer-events-none" style="background: linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%);">
    <div class="shape shape1 absolute" style="width:350px;height:350px;background:rgba(59,130,246,0.25);top:10%;left:10%;filter:blur(60px);"></div>
    <div class="shape shape2 absolute" style="width:250px;height:250px;background:rgba(52,211,153,0.25);bottom:10%;right:15%;filter:blur(60px);"></div>
  </div>
  <div id="mouse-light" style="position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.35) 0%,transparent 40%);pointer-events:none;z-index:0;will-change:transform;display:block;"></div>

  <div class="flex h-screen w-full relative">
    <!-- LNB Wrapper -->
    <div :class="['flex-shrink-0 relative transition-all duration-300 ease-in-out', isLnbOpen ? 'w-64 mr-6' : 'w-0']">
      <LnbMenu v-if="isLnbOpen">
        <template #new-chat-btn>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </template>
        <template #session-list>
          <ChatSessionList :sessions="chatSessions" :activeSessionId="activeSessionId" @select="selectSession" />
        </template>
      </LnbMenu>
    </div>
    <LnbToggleButton @click="toggleLnb">
      <!-- 토글 아이콘 -->
      <svg v-if="isLnbOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
    </LnbToggleButton>

    <!-- Main Content -->
    <main class="flex-grow h-screen overflow-y-auto transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8">
      <div class="w-full max-w-4xl mx-auto relative z-10">
        <header class="flex items-center justify-center mb-8">
          <div class="w-12 h-12 mr-4 flex items-center justify-center">
            <img src="./assets/logo.png" alt="ClariFact Logo" class="w-12 h-12" />
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-700">ClariFact</h1>
        </header>
        <PromptSection />
        <AnswerCard :title="selectedData ? selectedData.title : ''" :summary="selectedData ? selectedData.summary : ''" :status="selectedData ? '불러오기 완료' : ''" :statusClass="selectedData ? 'bg-gray-100/50 text-gray-800' : ''">
          <template #main-content-area>
            <div v-if="selectedData && chatSessions.find(s => s.id === activeSessionId).mode === 'comparison'">
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-white/20"><tr><th class="p-3 font-semibold text-sm border-b border-white/30">모델명</th><th class="p-3 font-semibold text-sm border-b border-white/30">핵심 사양</th><th class="p-3 font-semibold text-sm border-b border-white/30">특징</th></tr></thead>
                  <tbody>
                    <tr v-for="p in selectedData.products" :key="p.name" class="hover:bg-white/20">
                      <td class="p-3 text-sm border-b border-white/30 font-medium">{{ p.name }}</td>
                      <td class="p-3 text-sm border-b border-white/30">{{ p.specs }}</td>
                      <td class="p-3 text-sm border-b border-white/30">{{ p.features }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else-if="selectedData && chatSessions.find(s => s.id === activeSessionId).mode === 'knowledge'">
              <div class="prose max-w-none">
                <div v-for="(sec, idx) in selectedData.sections" :key="idx" class="mb-4">
                  <h3 class="font-bold">{{ sec.heading }}</h3>
                  <p v-html="sec.content.replace(/\n/g, '<br>')"></p>
                </div>
              </div>
            </div>
            <div v-else-if="selectedData && chatSessions.find(s => s.id === activeSessionId).mode === 'professional'">
              <div class="prose max-w-none">
                <p>{{ selectedData.explanation }}</p>
                <pre class="bg-gray-800 text-white p-4 rounded mt-4"><code>{{ selectedData.code }}</code></pre>
              </div>
            </div>
            <div v-else class="text-gray-500">예시 세션을 왼쪽에서 선택하세요.</div>
          </template>
          <template #action-buttons>
            <button v-if="selectedData && selectedData.citation" class="px-3 py-1 text-sm bg-white/40 text-gray-700 rounded-full">인용 복사 (APA)</button>
          </template>
          <template #source-list>
            <li v-for="(s, i) in (selectedData ? selectedData.sources : [])" :key="i" class="text-sm text-gray-600">{{ s }}</li>
          </template>
          <template #verified-time>
            <span class="text-xs text-gray-500">{{ selectedData ? new Date().toLocaleString('ko-KR') + ' 기준으로 생성됨' : '' }}</span>
          </template>
        </AnswerCard>
        <InitialMessage v-if="!selectedData" />
        <ErrorBox v-if="errorMessage" :error="errorMessage" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LnbMenu from './components/LnbMenu.vue';
import LnbToggleButton from './components/LnbToggleButton.vue';
import PromptSection from './components/PromptSection.vue';
import AnswerCard from './components/AnswerCard.vue';
import ErrorBox from './components/ErrorBox.vue';
  import ChatSessionList from './components/ChatSessionList.vue';
import InitialMessage from './components/InitialMessage.vue';

const isLnbOpen = ref(false);
const errorMessage = ref('');

// Sessions now include demo data shapes similar to demo.html's getMockData
const chatSessions = ref([
  { id: 1, title: '노트북 비교 (예시)', mode: 'comparison', data: { title: '노트북 비교 (데모)', summary: '데모 데이터입니다. 실제 AI는 더 정확한 정보를 제공합니다.', products: [ { name: '갤럭시북 Pro (데모)', specs: 'Intel Core i7, 16GB RAM', features: 'AMOLED 디스플레이, 초경량' }, { name: 'LG 그램 (데모)', specs: 'Intel Core i5, 16GB RAM', features: '매우 가벼운 무게, 긴 배터리' }, { name: '맥북 에어 (데모)', specs: 'Apple M3, 8GB RAM', features: 'macOS, 뛰어난 성능 효율' } ], sources: ['다나와 (샘플)', '노트북리뷰 (샘플)'] } },
  { id: 2, title: '스태그플레이션이란? (예시)', mode: 'knowledge', data: { title: '스태그플레이션 원인과 영향 (데모)', summary: '스태그플레이션은 경기 침체와 물가 상승이 동시에 발생하는 현상입니다.', sections: [ { heading: '주요 원인', content: '1. 공급 충격: 원유 가격 급등 등으로 발생합니다.\n2. 정책 실패: 통화정책의 부작용 등.' }, { heading: '거시 경제에 미치는 영향', content: '실업률과 물가 상승이 동시에 발생하여 가계의 실질 소득이 감소합니다.' } ], sources: ['한국은행 (샘플)', 'KDI (샘플)'], citation: '한국은행. (2025). 스태그플레이션. 경제용어사전.' } }
]);
const activeSessionId = ref(chatSessions.value.length > 0 ? chatSessions.value[0].id : null);
const selectedData = ref(chatSessions.value.length > 0 ? chatSessions.value[0].data : null);

// Set LNB open by default so examples are visible
const isLnbOpenDefault = true;
if (isLnbOpenDefault) isLnbOpen.value = true;

function selectSession(id) {
  activeSessionId.value = id;
  const sess = chatSessions.value.find(s => s.id === id);
  selectedData.value = sess ? sess.data : null;
}
function toggleLnb() {
  isLnbOpen.value = !isLnbOpen.value;
}
</script>
