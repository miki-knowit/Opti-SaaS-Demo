<script setup lang="ts">
import TextImageBlock from './TextImageBlock.vue';

defineProps<{
    sectionBlock: {
        __typename: 'SectionBlock';
        HeadingProp?: string | null;
        ContentAreaProp?: Array<any> | null;
    };
}>();
</script>

<template>
    <section class="section section--halves-xxxl">
        <div class="section__container">
            <div v-if="sectionBlock.HeadingProp" class="section__heading">
                <h2 class="heading">{{ sectionBlock.HeadingProp }}</h2>
            </div>

            <TextImageBlock
                v-for="(item, index) in (sectionBlock.ContentAreaProp ?? []).filter(
                    (i) => i?.__typename === 'TextImageBlock',
                )"
                :key="index"
                :block="item"
            />
        </div>
    </section>
</template>
