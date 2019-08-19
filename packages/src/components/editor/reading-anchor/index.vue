<template>
    <div class="km-reading-anchor" :class="{hidden: !visibleStatus, transition: isStatic && !hardTransition, fixed: !isStatic}">
        <!-- 本文导读 -->
        <!--<transition :name="isAnimate ? 'slow' : 'none'">-->
            <div class="reading-anchor">
                <div class="anchor-container">
                    <div class="anchor-title">
                        <p>本文导读</p>
                        <em></em>
                    </div>
                    <sl-anchor :getContainer="getContainer" :affix="false" :showInkInFixed="false">
                        <sl-anchor-link v-for="item in anchorList" :key="item.title" :href="item.href" :title="item.title" :class="item.type === 'H3' && 'anchor-space'"></sl-anchor-link>
                    </sl-anchor>
                </div>
            </div>
        <!--</transition>-->
    </div>
</template>

<script>
    import { readingAnchorProps } from "@/components/editor/interface";

    export default {
        name: "ReadingAnchor",
        props: readingAnchorProps,
        data() {
            return {
                hardTransition: false,
            }
        },
        components: {
        },
        methods: {
        },
        computed: {
            visibleStatus() {
                return this.isStatic ? this.visible : (this.visible && this.anchorList.length);
            },
        },
        watch: {
            'isStatic'(val) {
                this.$nextTick(() => {
                    val ? (this.$el.classList.add('transition'), this.hardTransition = false) : (this.$el.classList.remove('transition'), this.hardTransition = true);
                })
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/styles/components/editor/reading-anchor/index.scss';
</style>
