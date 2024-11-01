import { TestBed } from '@angular/core/testing';
import { TopicsService } from './topics.service';
import { TopicsHttpService } from '../../infrastructure/http/topics-http.service';
import { of } from 'rxjs';
import { ITopic } from '../../../shared/domains/ITopic';
import { IMessage } from '../../../shared/domains/IMessage';

describe('TopicsService', () => {
  let service: TopicsService;
  let httpServiceSpy: jasmine.SpyObj<TopicsHttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TopicsHttpService', ['getTopics', 'getTopicsByTerm', 'getMessagesByTopic']);
    TestBed.configureTestingModule({
      providers: [
        TopicsService,
        { provide: TopicsHttpService, useValue: spy }
      ]
    });
    service = TestBed.inject(TopicsService);
    httpServiceSpy = TestBed.inject(TopicsHttpService) as jasmine.SpyObj<TopicsHttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTopics', () => {
    it('should return topics from http service', (done) => {
      const expectedTopics: ITopic[] = [
        {
          topicName: 'Topic 1',
          totalPartitions: 0,
          totalMessages: 0,
          consumers: []
        },
        {
          topicName: 'Topic 2',
          totalPartitions: 0,
          totalMessages: 0,
          consumers: []
        }
      ];

      httpServiceSpy.getTopics.and.returnValue(of(expectedTopics));

      service.getTopics().subscribe({
        next: (topics) => {
          expect(topics).toEqual(expectedTopics);
          expect(httpServiceSpy.getTopics).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });
  });

  describe('getTopicsByTerm', () => {
    it('should return filtered topics from http service', (done) => {
      const searchTerm = 'test';
      const expectedTopics: ITopic[] = [
        {
          topicName: 'Test Topic',
          totalPartitions: 0,
          totalMessages: 0,
          consumers: []
        }
      ];

      httpServiceSpy.getTopicsByTerm.and.returnValue(of(expectedTopics));

      service.getTopicsByTerm(searchTerm).subscribe({
        next: (topics) => {
          expect(topics).toEqual(expectedTopics);
          expect(httpServiceSpy.getTopicsByTerm).toHaveBeenCalledWith(searchTerm);
          done();
        },
        error: done.fail
      });
    });
  });

  describe('getMessagesByTopic', () => {
    it('should return messages for a topic from http service', (done) => {
      const topic = 'test-topic';
      const offset = 0;
      const limit = 10;
      const expectedMessages: IMessage[] = [
        {
          value: 'Message 1',
          timestamp: '',
          partition: 0,
          offset: 0
        },
        {
          value: 'Message 2',
          timestamp: '',
          partition: 0,
          offset: 0
        }
      ];

      httpServiceSpy.getMessagesByTopic.and.returnValue(of(expectedMessages));

      service.getMessagesByTopic(topic, offset, limit).subscribe({
        next: (messages) => {
          expect(messages).toEqual(expectedMessages);
          expect(httpServiceSpy.getMessagesByTopic).toHaveBeenCalledWith(topic, offset, limit);
          done();
        },
        error: done.fail
      });
    });
  });
});