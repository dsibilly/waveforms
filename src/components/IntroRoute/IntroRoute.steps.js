import React, { Fragment } from 'react';
import VolumeOn from 'react-icons/lib/md/volume-up';

import { COLORS, DEFAULT_WAVEFORM_SHAPE } from '../../constants';
import { roundTo } from '../../utils';

import Header from '../Header';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import Heading from '../Heading';
import Emphasized from '../Emphasized';
import Sidebar from '../Sidebar';
import FrequencyGraph from '../FrequencyGraph';
import IntroRouteAirGrid from '../IntroRouteAirGrid';
import MountWhenVisible from '../MountWhenVisible';
import RevealableAnswer from '../RevealableAnswer';
import WaveformEquation from '../WaveformEquation';
import UnorderedList from '../UnorderedList';
import KeyboardCharacter from '../KeyboardCharacter';
import PortraitOnly from '../PortraitOnly';
import LandscapeOnly from '../LandscapeOnly';
import Link from '../Link';
import SliderIcon from '../SliderIcon';

import type {
  WaveformShape,
  HarmonicsForShape,
  WaveformAdditionType,
} from '../../types';

export type IntroStep =
  | 'title'
  | 'about-this-thing'
  | 'about-sound-toggling'
  | 'reading-waveform-graphs-intro'
  | 'x-axis-time'
  | 'y-axis-amplitude'
  | 'y-axis-amplitude-with-control'
  | 'frequency-introduction'
  | 'frequency-introduction-pt2'
  | 'frequency-with-control'
  | 'reading-waveform-graphs-summary'
  | 'how-sound-works-intro'
  | 'how-sound-works-air-grid'
  | 'how-sound-works-air-grid-pt2'
  | 'harmonics-intro'
  | 'sine-wave-graph'
  | 'triangle-wave'
  | 'triangle-wave-graph'
  | 'square-wave'
  | 'square-wave-graph'
  | 'sawtooth-wave'
  | 'sawtooth-wave-graph'
  | 'additive-synthesis-intro'
  | 'additive-synthesis-basic-add'
  | 'additive-synthesis-intro-convergence'
  | 'additive-synthesis-intro-num-of-harmonics'
  | 'additive-synthesis-harmonics-tie-in'
  | 'additive-synthesis-phase'
  | 'additive-synthesis-noise-cancelling'
  | 'conclusion'
  | 'over';

export const INTRO_STEPS: Array<IntroStep> = [
  'title',
  'about-this-thing',
  'about-sound-toggling',
  'reading-waveform-graphs-intro',
  'x-axis-time',
  'y-axis-amplitude',
  'y-axis-amplitude-with-control',
  'frequency-introduction',
  'frequency-introduction-pt2',
  'frequency-with-control',
  'reading-waveform-graphs-summary',
  'how-sound-works-intro',
  'how-sound-works-air-grid',
  'how-sound-works-air-grid-pt2',
  'harmonics-intro',
  'sine-wave-graph',
  'triangle-wave',
  'triangle-wave-graph',
  'square-wave',
  'square-wave-graph',
  'sawtooth-wave',
  'sawtooth-wave-graph',
  'additive-synthesis-intro',
  'additive-synthesis-basic-add',
  'additive-synthesis-intro-convergence',
  'additive-synthesis-intro-num-of-harmonics',
  'additive-synthesis-harmonics-tie-in',
  'additive-synthesis-phase',
  'additive-synthesis-noise-cancelling',
  'conclusion',
  'over',
];

export type StepData = {
  id: string,

  // Waveform parameters
  showWaveform: boolean,
  frequencyOverride: ?number,
  amplitudeOverride: ?number,
  isPlaying: boolean,
  waveformShape: WaveformShape,
  waveformColor: string,
  waveformOpacity: number,
  // TODO: should just use `xAxisOpacity`. When opacity is 0, we can choose
  // not to render within the component (or just keep it hidden)
  showXAxis: boolean,
  showYAxis: boolean,
  showXAxisLabels: boolean,
  showYAxisLabels: boolean,
  showYAxisIntercept: boolean,
  xAxisOpacity: number,
  yAxisOpacity: number,
  showAmplitudeSlider: boolean,
  showFrequencySlider: boolean,
  frequencySliderMin: number,
  frequencySliderMax: number,
  frequencySliderStep: number,
  showCycleIndicator: boolean,
  showVolumeControls: boolean,

  // WaveformAddition params
  useWaveformAddition: boolean,
  waveformAdditionType: WaveformAdditionType,
  showNumOfHarmonicsSlider: boolean,
  showConvergenceSlider: boolean,
  showPhaseSlider: boolean,
  harmonicsForShapeOverride: HarmonicsForShape,
  numOfHarmonicsOverride: number,
  convergenceOverride: number,

  // Section parameters
  getMargin: (windowWidth: number) => number,
  children: React$Node,
};

const marginFunctions = {
  none: windowHeight => 0,
  xsmall: windowHeight => windowHeight * 0.15,
  small: windowHeight => windowHeight * 0.35,
  large: windowHeight => windowHeight * 0.45,
};

const defaults: StepData = {
  showWaveform: true,
  frequencyOverride: null,
  amplitudeOverride: null,
  isPlaying: false,
  waveformShape: DEFAULT_WAVEFORM_SHAPE,
  waveformColor: COLORS.primary[500],
  waveformOpacity: 1,

  showXAxis: true,
  showYAxis: true,
  showXAxisLabels: false,
  showYAxisLabels: false,
  showYAxisIntercept: false,
  xAxisOpacity: 1,
  yAxisOpacity: 1,
  showAmplitudeSlider: false,
  showFrequencySlider: false,
  frequencySliderMin: 0.5,
  frequencySliderMax: 3,
  frequencySliderStep: 0.1,
  showCycleIndicator: false,
  showVolumeControls: true,

  useWaveformAddition: false,
  waveformAdditionType: 'harmonics',
  showNumOfHarmonicsSlider: false,
  showConvergenceSlider: false,
  showPhaseSlider: false,

  getMargin: marginFunctions.large,
};

export const steps = {
  title: {
    ...defaults,
    frequencyOverride: 1,
    showYAxis: false,
    showVolumeControls: false,
    getMargin: marginFunctions.none,
    children: <Header />,
  },
  'about-this-thing': {
    ...defaults,
    isPlaying: true,
    showYAxis: false,
    showVolumeControls: false,
    getMargin: marginFunctions.small,
    children: (
      <Fragment>
        <Paragraph>Hi there!</Paragraph>
        <Paragraph>
          This interactive guide introduces waves and waveforms. We'll go over
          the fundamental physics of sound, learn how it relates to music and
          harmony, and discover how to build complex tones from simple ones.
        </Paragraph>
        <Paragraph>
          This guide is aimed at a general audience–no prior knowledge is
          required. It may be of particular interest to musicians, producers,
          and aspiring audio engineers, but the goal is to make it compelling
          enough that even folks without a particular passion for audio find it
          interesting.
        </Paragraph>
      </Fragment>
    ),
  },
  'about-sound-toggling': {
    ...defaults,
    isPlaying: true,
    showYAxis: false,
    getMargin: marginFunctions.small,
    children: ({ orientation }) => (
      <Fragment>
        <Heading>Listen in</Heading>
        <Paragraph>
          Because this guide deals with audio waves, it's beneficial to be able
          to hear stuff. This way, when you change parameters, you can hear the
          difference it makes.
        </Paragraph>
        <Paragraph>
          Because nobody likes autoplaying sounds, the volume is currently
          muted. You can control it using the "volume" widget in the{' '}
          <PortraitOnly>top-right</PortraitOnly>
          <LandscapeOnly>bottom-left</LandscapeOnly> corner.
        </Paragraph>
        <LandscapeOnly>
          <Paragraph>
            You can also use <strong>keyboard shortcuts</strong>! The numbers{' '}
            <KeyboardCharacter>0</KeyboardCharacter> –{' '}
            <KeyboardCharacter>9</KeyboardCharacter> control the volume. You can
            also press <KeyboardCharacter>M</KeyboardCharacter> to mute or
            unmute the audio.
          </Paragraph>
          <Paragraph>
            <Emphasized>
              Try it now by pressing <KeyboardCharacter>M</KeyboardCharacter> on
              your keyboard!
            </Emphasized>
          </Paragraph>
        </LandscapeOnly>
      </Fragment>
    ),
  },
  'reading-waveform-graphs-intro': {
    ...defaults,
    children: (
      <Fragment>
        <SectionTitle>1. Reading Waveform Graphs</SectionTitle>
        <Paragraph>
          First, let's take a closer look at the waveform{' '}
          <PortraitOnly>above</PortraitOnly>
          <LandscapeOnly>to the left</LandscapeOnly>.
        </Paragraph>

        <Paragraph>
          We're looking at a graph, AKA a cartesian plane. The blue line is the
          data we're graphing, and it represents a waveform. Specifically, we're
          graphing the waveform's <strong>amplitude over time</strong>.
        </Paragraph>

        <Paragraph>Let's dig into what that means.</Paragraph>
      </Fragment>
    ),
  },
  'x-axis-time': {
    ...defaults,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    getMargin: marginFunctions.xsmall,
    children: (
      <Fragment>
        <Heading>Time</Heading>
        <Paragraph>
          The horizontal line, our X axis, represents <strong>time</strong>.
        </Paragraph>

        <Paragraph>
          In this case, our graph is showing a 1-second interval. Don't worry
          too much about the specific unit, though; the important bit is to
          understand that we're graphing how something changes over time.
        </Paragraph>
      </Fragment>
    ),
  },
  'y-axis-amplitude': {
    ...defaults,
    waveformOpacity: 0.5,
    showYAxisLabels: true,
    showXAxis: false,
    getMargin: marginFunctions.xsmall,
    children: (
      <Fragment>
        <Heading>Amplitude</Heading>
        <Paragraph>
          The vertical line, our Y axis, represents <strong>amplitude</strong>.
          We'll go into more detail in a bit about what amplitude really is, but
          for now, you can think of it as volume. The bigger the wave, the
          louder the sound.
        </Paragraph>
        <Paragraph>
          The unit of measurement for amplitude is the <em>decibel</em>,
          abbreviated as "dB". Decibels are a relative unit, and there are many
          different scales that they can be relative to. In our case, the value
          ranges from -1 to 1.
        </Paragraph>
      </Fragment>
    ),
  },
  'y-axis-amplitude-with-control': {
    ...defaults,
    frequencyOverride: 1,
    getMargin: marginFunctions.xsmall,
    showYAxisLabels: true,
    showXAxis: false,
    showAmplitudeSlider: true,
    children: (
      <Fragment>
        <Paragraph>
          Let's make this interactive! Use the{' '}
          <SliderIcon fieldName="amplitude" />{' '}
          <LandscapeOnly>below</LandscapeOnly>
          <PortraitOnly>above</PortraitOnly> the waveform to see how changing
          the amplitude of the waveform affects the graph.
        </Paragraph>

        <Paragraph>
          Try setting it all the way to 0, and notice how the line flattens out.
          0 amplitude means that it's completely silent.
        </Paragraph>

        <br />

        <Sidebar type="summary">
          <Paragraph>
            A waveform is a <strong>graph</strong> that shows a wave's change in{' '}
            <strong>amplitude</strong> over <strong>time</strong>.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'frequency-introduction': {
    ...defaults,
    amplitudeOverride: 1,
    frequencyOverride: 2,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    showCycleIndicator: true,
    children: (
      <Fragment>
        <Heading>Frequency</Heading>

        <Paragraph>
          Let's update the waveform so that it repeats twice in the available
          time.
        </Paragraph>

        <Paragraph>
          We're able to seamlessly repeat the waveform because it's{' '}
          <strong>periodic</strong>. What this means is that it's a loopable,
          repeatable pattern; you can stack them side-by-side and they form a
          continuous shape.
        </Paragraph>

        <Paragraph>
          <strong>Frequency</strong> is a measure of how many times the waveform
          repeats in a given period of time. The common unit of measurement for
          frequency is the <em>hertz</em>, abbreviated as "Hz", which measures
          the number of repetitions per second.
        </Paragraph>

        <Paragraph>
          Because we know that this waveform graph shows a 1-second interval, we
          can deduce that this wave is oscillating at <strong>2Hz</strong>.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            Not all waveforms are periodic. For example, white noise—the sound
            of static, or waves crashing on the beach—is just a uniform
            distribution of all frequencies. Because it isn't periodic, it
            doesn't have a discernable pitch.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'frequency-introduction-pt2': {
    ...defaults,
    getMargin: marginFunctions.xsmall,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    frequencyOverride: 2,
    children: (
      <Fragment>
        <Paragraph>
          Frequency is just the technical term for "pitch". The faster a wave
          repeats itself, the higher the pitch of the note.
        </Paragraph>
        <Paragraph>
          For example, when a singer sings an "A4" note (The "A" in the middle
          of a typical piano), their throat vibrates at 440Hz. If their voice
          raises to a "C5" note, 3 semitones higher, their throat would vibrate
          at ~523Hz.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            It is very important to point out that the waves we've been dealing
            with so far, at 1Hz and 2Hz, have been far too low-frequency to be
            audible. Perfect human hearing ranges from 20Hz to 20,000Hz, with
            20Hz being the lowest sub-bass you can possibly hear.
          </Paragraph>
          <Paragraph>
            The reason for this discrepancy is that it's much easier to teach
            the concepts when the waves are slower. For example, you wouldn't be
            able to see a 440Hz wave oscillate: it's much too fast.
          </Paragraph>
          <Paragraph>
            The waves you hear when you unmute the sound are running at{' '}
            <strong>100x</strong> the selected frequency.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'frequency-with-control': {
    ...defaults,
    getMargin: marginFunctions.small,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    children: (
      <Fragment>
        <Paragraph>
          Try tweaking the frequency with the{' '}
          <SliderIcon fieldName="frequency" />.
        </Paragraph>
        <Paragraph>
          Don't forget to enable sound with the{' '}
          <LandscapeOnly>
            <KeyboardCharacter>M</KeyboardCharacter> key
          </LandscapeOnly>
          <PortraitOnly>volume control above</PortraitOnly> to see how frequency
          and amplitude affect the resulting sound!
        </Paragraph>
      </Fragment>
    ),
  },
  'reading-waveform-graphs-summary': {
    ...defaults,
    getMargin: marginFunctions.small,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    children: (
      <Fragment>
        <Paragraph>
          Let's wrap this stuff up in a semi-formal definition.
        </Paragraph>

        <Paragraph>
          A waveform is just a schematic that describes how a wave's amplitude
          changes over time. When the waveform is periodic, it produces a tone,
          and the pitch of that tone is dependent on how quickly the waveform
          repeats.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            If you're feeling confused and having trouble understanding, it's my
            fault for not explaining it more clearly. The{' '}
            <Link
              external
              to="https://en.wikipedia.org/wiki/Curse_of_knowledge"
              target="_blank"
            >
              curse of knowledge
            </Link>{' '}
            means it's hard for me to know if I'm teaching this stuff
            adequately: please{' '}
            <Link external to="https://twitter.com/JoshWComeau" target="_blank">
              let me know
            </Link>{' '}
            if it doesn't make sense, I'd love to make this clearer.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'how-sound-works-intro': {
    ...defaults,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.5,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    frequencyOverride: 1,
    children: (
      <Fragment>
        <SectionTitle>2. How Sound Works</SectionTitle>

        <Paragraph>
          So far, what we've covered has been very abstract. We know that waves
          are just changes in amplitude over time, but what does that actually
          mean?
        </Paragraph>

        <Paragraph>
          To answer this question, we need to look at some physics.
        </Paragraph>
      </Fragment>
    ),
  },
  'how-sound-works-air-grid': {
    ...defaults,
    isPlaying: true,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.5,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    frequencySliderMax: 2,
    getMargin: marginFunctions.xsmall,
    children: ({ amplitude, frequency, progress, currentStep }) => (
      <Fragment>
        <Paragraph>
          The air around us is filled with molecules. When you play a sound out
          of a speaker, the wave moves through the molecules in the air to reach
          your ear, and that's how you hear it.
        </Paragraph>
        <Paragraph>
          Sound is vibration. This is something many have discovered, when
          they've touched a speaker cone and felt how it vibrates as it plays.
          You can think of waves as a chain reaction of vibrations.
        </Paragraph>

        <Paragraph>
          Let's take a look at how this works. Imagine that each dot in this
          grid is an air molecule:
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="how-sound-works-air-grid"
          estimatedSize={226}
        >
          <IntroRouteAirGrid
            amplitude={amplitude}
            frequency={frequency}
            progress={progress}
          />
        </MountWhenVisible>

        <Paragraph>
          A key thing to note is that the air molecules themselves aren't flying
          across the space; each molecule is just vibrating back and forth, but
          the chain-reaction of vibrations sends a pulse forwards.
        </Paragraph>
      </Fragment>
    ),
  },
  'how-sound-works-air-grid-pt2': {
    ...defaults,
    isPlaying: true,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.25,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    showYAxisIntercept: true,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    frequencySliderMax: 2,
    getMargin: marginFunctions.small,
    children: ({ amplitude, frequency, progress, currentStep }) => (
      <Fragment>
        <Paragraph>
          The waveform we've been looking at{' '}
          <LandscapeOnly>on the left</LandscapeOnly>
          <PortraitOnly>above</PortraitOnly> shows the trajectory of a single
          air molecule. Compare the blue dot added to the waveform graph
          indicating the current amplitude with the first column of air
          molecules in the grid below:
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="how-sound-works-air-grid-pt2"
          estimatedSize={226}
        >
          <IntroRouteAirGrid
            highlightAirGridColumn
            amplitude={amplitude}
            frequency={frequency}
            progress={progress}
          />
        </MountWhenVisible>

        <Paragraph>
          Because our waveform graph is just a representation of the change in
          amplitude over time, it maps directly to what's actually happening
          with the air molecules!
        </Paragraph>

        <Paragraph>
          If you haven't already, try fiddling with the{' '}
          <SliderIcon fieldName="amplitude" /> and{' '}
          <SliderIcon fieldName="frequency" /> to see how it affects the air
          molecules in the grid.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            Curious about how our ears translate these waves into sound that the
            brain understands? It's outside the scope of this guide, but it's
            super interesting stuff!
          </Paragraph>
          <Paragraph>
            <Link
              external
              target="_blank"
              to="https://www.nidcd.nih.gov/health/how-do-we-hear"
            >
              Learn more about our ears and sound
            </Link>.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'harmonics-intro': {
    ...defaults,
    isPlaying: true,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <SectionTitle>3. Harmonics</SectionTitle>
        <Paragraph>
          So far, we've been looking at the sine waveform exclusively, but there
          are plenty of other waveforms!
        </Paragraph>

        <Paragraph>
          We started with the sine because it is the "fundamental" waveform.
          What that means is that when a sine wave vibrates the air at 440Hz,
          the only thing you hear is a 440Hz tone. Sine waves are the "vanilla"
          wave; it doesn't have any bells or whistles.
        </Paragraph>
      </Fragment>
    ),
  },
  'sine-wave-graph': {
    ...defaults,
    isPlaying: true,
    frequencyOverride: 1,
    amplitudeOverride: 1,

    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          To understand what this means, let's take a look at a graph of the
          frequencies audible for a given waveform. Let's start with the sine
          wave's graph:
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="sine-wave-graph"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="sine"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>

        <Paragraph>
          This graph is pretty uninteresting: we're playing a{' '}
          {roundTo(frequency, 1)}Hz tone, and so we see a spike at{' '}
          {roundTo(frequency, 1)}Hz.
        </Paragraph>
        <Sidebar>
          <Paragraph>
            Try changing the amplitude/frequency settings under the waveform to
            see how it affects this graph. This may help build an intuitive
            understanding of what this graph represents!
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'triangle-wave': {
    ...defaults,
    isPlaying: true,
    frequencyOverride: 1,
    amplitudeOverride: 1,
    waveformShape: 'triangle',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Heading>The Triangle Wave</Heading>

        <Paragraph>
          It looks quite a bit like a sine wave, but with the curviness removed.
          Instead, straight lines connect in triangle-like shapes.
        </Paragraph>

        <Paragraph>
          What effect does this have on the way it sounds? If you haven't
          already, go ahead and enable sound using the button in the top-right,
          and scroll between this and the previous section to hear the
          difference.
        </Paragraph>

        <Paragraph>
          Notice that the sound is a little "brighter"? It doesn't quite sound
          so muffled? This is because of <strong>harmonics</strong>
        </Paragraph>
      </Fragment>
    ),
  },
  'triangle-wave-graph': {
    ...defaults,
    isPlaying: true,
    waveformShape: 'triangle',
    amplitudeOverride: 1,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          Harmonics are additional frequencies that happen automatically with
          certain waveforms. We'll learn more about why that is soon, but first,
          let's graph these additional harmonics:
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="triangle-wave-graph"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="triangle"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>
      </Fragment>
    ),
  },
  'square-wave': {
    ...defaults,
    isPlaying: true,
    frequencyOverride: 1,
    amplitudeOverride: 1,
    waveformShape: 'square',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, progress, currentStep }) => (
      <Fragment>
        <Heading>The Square Wave</Heading>

        <Paragraph>
          The square wave is arguably the most extreme of the common periodic
          waveforms. It jumps between the highest and lowest possible values.
          It's a binary wave: it's either +1 or -1.
        </Paragraph>
      </Fragment>
    ),
  },
  'square-wave-graph': {
    ...defaults,
    isPlaying: true,
    waveformShape: 'square',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          In terms of harmonics, the square wave features exactly the same
          intervals as the triangle wave: Every "odd" harmonic (3rd, 5th, 7th,
          etc). The difference between the square and the triangle is that the
          square's harmonics are louder: they don't fall off so quickly, so you
          get more higher frequencies. This is plainly noticeable in the sound:
          squares sound much "brighter" than triangles.
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="square-wave-graph"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="square"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>

        <Sidebar>
          <Paragraph>
            Unlike the previous two waveforms, a perfect square wave is
            impossible; it cannot exist in nature, we can only approximate it.
            Can you think of why that might be?
          </Paragraph>
          <Paragraph>
            <RevealableAnswer>
              Remember, the waveform represents the displacement of air
              molecules. Molecules cannot "teleport" from the +1 position to the
              -1 position. In reality, when a square wave is played through a
              speaker, it causes the air to move very quickly from both
              positions, but it is not instantaneous.
            </RevealableAnswer>
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'sawtooth-wave': {
    ...defaults,
    isPlaying: true,
    waveformShape: 'sawtooth',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Heading>The Sawtooth Wave</Heading>

        <Paragraph>
          Finally, we have the sawtooth. Named after the blades of a saw, This
          waveform exhibits the linear rise of the triangle wave with the hard
          drop of the square wave.
        </Paragraph>

        <Paragraph>
          In terms of sound, it's vaguely similar to string instruments: when
          you run a bow across a violin's string, the friction between the two
          items causes the string to slip and catch, which causes the string to
          vibrate in a sawtooth-like pattern. Of course, real instruments
          produce far more complex waveforms than these basic ones!
        </Paragraph>
      </Fragment>
    ),
  },
  'sawtooth-wave-graph': {
    ...defaults,
    isPlaying: true,
    waveformShape: 'sawtooth',
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          In terms of harmonics, sawtooth waveforms have additional frequencies
          at every interval, unlike triangles and squares which only add
          harmonics at every second interval.
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="sawtooth-wave-graph"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="sawtooth"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>
      </Fragment>
    ),
  },
  'additive-synthesis-intro': {
    ...defaults,
    // frequencyOverride: 2,
    children: (
      <Fragment>
        <SectionTitle>4. Additive Synthesis</SectionTitle>
        <Paragraph>
          In the previous section, we learned about how different waveforms have
          different harmonics, but it's totally unclear <em>why</em> that's the
          case. For example, why does a square wave have all those extra tones
          when we're still just oscillating at a single frequency?
        </Paragraph>

        <Paragraph>
          To make sense of this, there's a surprising truth about waveforms:{' '}
          <strong>
            all of them can be built by just layering a bunch of sine waves on
            top of each other.
          </strong>
        </Paragraph>

        <WaveformEquation />

        <Paragraph>
          At first blush, this probably doesn't make any sense. How can sine
          waves be combined to make drastically-different waveforms like square
          or sawtooth?
        </Paragraph>

        <Paragraph>The answer lies in how waveform addition works.</Paragraph>
      </Fragment>
    ),
  },
  'additive-synthesis-basic-add': {
    ...defaults,
    useWaveformAddition: true,
    harmonicsForShapeOverride: 'square',
    numOfHarmonicsOverride: 1,
    convergenceOverride: 0,
    getMargin: marginFunctions.small,
    children: ({ currentStep }) => (
      <Fragment>
        <Paragraph>
          The waveform graph we've been looking at now shows two waves:
        </Paragraph>

        <UnorderedList>
          <li>
            <strong style={{ color: COLORS.primary[500] }}>1Hz at 1dB</strong>{' '}
            (our base note)
          </li>
          <li>
            <strong style={{ color: COLORS.secondary[500] }}>
              3Hz at 0.33dB
            </strong>{' '}
            (our first harmonic)
          </li>
        </UnorderedList>

        <Paragraph>
          Put another way, this new wave is 3 times as fast, but at one-third
          the amplitude.
        </Paragraph>

        <Paragraph>
          If you've ever used audio editing software, you've seen how a full
          song - which is comprised of many different instruments and sounds -
          creates a single wave. What we're looking at over there is not a wave
          yet: we have to combine the 3 lines into 1.
        </Paragraph>

        <Paragraph>
          This is known as <strong>waveform addition</strong>, and it makes
          sense when you think of it in real-world terms.
        </Paragraph>

        <Paragraph>
          Remember, sound is just the vibration of air molecules. If you play 2
          distinct tones, they both cause the air molecules to vibrate. A game
          of tug-of-war has 2 people pulling on a rope, and the displacement of
          the rope is the result of both people's effort.
        </Paragraph>

        <Paragraph>
          How does the addition work? It's arithmetic: imagine the waveform
          graph as a bunch of individual points. At each point, you simply add
          the individual amplitude values. The new set of points is our new
          single waveform.
        </Paragraph>
      </Fragment>
    ),
  },
  'additive-synthesis-intro-convergence': {
    ...defaults,
    useWaveformAddition: true,
    harmonicsForShapeOverride: 'square',
    numOfHarmonicsOverride: 1,
    showConvergenceSlider: true,
    getMargin: marginFunctions.small,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          Use the new <strong>Convergence</strong> slider to watch as the two
          lines are added together.
        </Paragraph>

        <Paragraph>
          Notice how it kinda looks like a square wave, if you squint?
        </Paragraph>
      </Fragment>
    ),
  },
  'additive-synthesis-intro-num-of-harmonics': {
    ...defaults,
    useWaveformAddition: true,
    harmonicsForShapeOverride: 'square',
    showConvergenceSlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          You might be wondering where the values for that first harmonic came
          from. Why did we add a wave at 3x the frequency and 1/3rd the
          amplitude?
        </Paragraph>

        <Paragraph>
          The answer is that we <em>reverse engineered</em> the square wave.
          Remember this chart, showing the harmonics for a square wave?
        </Paragraph>

        <MountWhenVisible
          currentStep={currentStep}
          belongsToStep="additive-synthesis-intro-num-of-harmonics"
          estimatedSize={390}
        >
          <FrequencyGraph
            shape="square"
            baseFrequency={frequency}
            baseAmplitude={amplitude}
          />
        </MountWhenVisible>

        <Paragraph>
          The two waves we're graphing are the 2 first waves in this chart!
        </Paragraph>
      </Fragment>
    ),
  },
  'additive-synthesis-harmonics-tie-in': {
    ...defaults,
    useWaveformAddition: true,
    harmonicsForShapeOverride: 'square',
    numOfHarmonicsOverride: 1,
    showConvergenceSlider: true,
    showNumOfHarmonicsSlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          The more harmonics we add from this chart, the more our waveform
          starts to look like a square wave. Use the new{' '}
          <strong>Number of Harmonics</strong> slider to change the number
          rendered, and see how it affects the converged line.
        </Paragraph>

        <Sidebar type="warning">
          <Paragraph>
            The slider lets you add up to 75 additional harmonics, but it's
            computationally intensive to calculate and render all these waves!
            If you're on a slower device, it may make the page slow /
            unresponsive if you climb up too high.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  'additive-synthesis-phase': {
    ...defaults,
    frequencyOverride: 1,
    amplitudeOverride: 0.75,
    useWaveformAddition: true,
    waveformAdditionType: 'phase',
    showPhaseSlider: true,
    convergenceOverride: 0,
    showConvergenceSlider: true,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Heading>Phase</Heading>
        <Paragraph>
          Something counter-intuitive about waveform addition is that it doesn't
          always make the resulting sound louder.
        </Paragraph>
        <Paragraph>
          To demonstrate this more clearly, first we have to learn about another
          waveform property: <strong>phase</strong>.
        </Paragraph>

        <Paragraph>
          Simply put, phase is the amount of offset applied to a wave, measured
          in degrees. If a wave is 180 degrees out of phase, for example, that
          means it's delayed by 50% of its period.
        </Paragraph>

        <Paragraph>
          Our waveform graph on the right has been updated to show two identical
          waves in terms of amplitude and frequency. Try adjusting the new{' '}
          <SliderIcon fieldName="phase" /> to see how phase affects the second
          waveform, relative to the first.
        </Paragraph>
      </Fragment>
    ),
  },
  'additive-synthesis-noise-cancelling': {
    ...defaults,
    useWaveformAddition: true,
    waveformAdditionType: 'phase',
    showPhaseSlider: true,
    convergenceOverride: 0,
    showConvergenceSlider: true,
    getMargin: marginFunctions.xsmall,
    children: ({ frequency, amplitude, currentStep }) => (
      <Fragment>
        <Paragraph>
          Try adjusting the <SliderIcon fieldName="convergence" /> to see how
          the phase of a waveform affects how loud the resulting wave is.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            Incidentally, this is exactly how noise-cancelling headphones work!
            They record the ambient noise around the headphones, offset its
            phase by 180 degrees, and mix it in with the sound coming out of the
            headphone's speakers. This "cancels out" the background noise, just
            as the 180-degree sine wave cancels out the original sine wave.
          </Paragraph>
          <Paragraph>
            This process is imperfect—real noise isn't as simple or consistent
            as sine waves, and there's latency between the sound being recorded
            and played back, so it generally works better on lower-frequency
            noise where the latency matters less—but it can be a remarkable
            effect in areas with consistent low-frequency noise, like airplanes
            or subways.
          </Paragraph>
        </Sidebar>
      </Fragment>
    ),
  },
  conclusion: {
    ...defaults,
    frequencyOverride: 1,
    amplitudeOverride: 0.75,
    showVolumeControls: false,
    isPlaying: true,
    children: (
      <Fragment>
        <SectionTitle>In Conclusion</SectionTitle>
        <Paragraph>
          An audio wave is the vibration of air molecules, which is how sound
          travels. A waveform describes a wave by graphing how its amplitude
          changes over time.
        </Paragraph>

        <Paragraph>
          Amplitude is the strength of a wave's effect; the higher the
          amplitude, the more the air molecules vibrate. This also translates
          into loudness for the human ear; the higher the amplitude, the louder
          the sound.
        </Paragraph>

        <Paragraph>
          There are many different kinds of waveforms. The most common periodic
          waveforms are the sine, triangle, square, and sawtooth.
        </Paragraph>

        <Paragraph>
          These waveforms are said to be periodic because the wave they
          represent repeats. This repetition gives the waveform its pitch, and
          the faster the repetition, the higher the pitch.
        </Paragraph>

        <Paragraph>
          Different waveforms have different harmonics. A harmonic is simply an
          additional frequency that occurs. The sine waveform is unique in that
          it doesn't have any additional harmonics; it is the fundamental
          waveform.
        </Paragraph>

        <Paragraph>
          To understand why certain waveforms have harmonics, we can attack the
          problem from the opposite end. Because the sine waveform is the
          fundamental waveform, it can be used to approximate all the other
          periodic waveforms, by just adding 1 sine wave at the appropriate
          intervals, and at the appropriate amplitude.
        </Paragraph>
      </Fragment>
    ),
  },
  over: {
    ...defaults,
    showWaveform: false,
    showVolumeControls: false,
    isPlaying: false,
    getMargin: marginFunctions.none,
    children: null,
  },
};

export const stepsArray = Object.entries(steps).map(([key, value]) => ({
  id: key,
  ...value,
}));
