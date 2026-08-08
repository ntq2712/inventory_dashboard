/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { describe, it, expect, vi, afterEach } from 'vitest';
import { vehiclesApi } from './vehicles/index';
import { instance } from './config';
import endpoint from './endpointConfig';

describe('vehiclesApi', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getVehicles calls instance.post with correct args', async () => {
    const mockResponse = { data: { status: 200, success: true, data: [{ id: 1 }], totalRows: 1 } }; // AxiosResponse-like
    const postSpy = vi.spyOn(instance, 'post').mockResolvedValue(mockResponse as any);

    const body = { pageIndex: 0, pageSize: 10 } as any;
    const res = await vehiclesApi.getVehicles(body);

    expect(postSpy).toHaveBeenCalledWith(endpoint.vehicles.list, body);
    expect(res).toBe(mockResponse);
  });

  it('getSummary calls instance.get and returns response', async () => {
    const mockResponse = { data: { status: 200, success: true, data: { total: 0, aging: 0, new: 0 } } } as any;
    const getSpy = vi.spyOn(instance, 'get').mockResolvedValue(mockResponse);

    const res = await vehiclesApi.getSummary();

    expect(getSpy).toHaveBeenCalledWith(endpoint.vehicles.summary);
    expect(res).toBe(mockResponse);
  });

  it('getAgingActions calls instance.get with vehicle id in url', async () => {
    const vehicleId = 42;
    const expectedUrl = endpoint.vehicles.agingActionsByVehicle.replace(':vehicleId', String(vehicleId));
    const mockResponse = { data: { status: 200, success: true, data: [] } } as any;
    const getSpy = vi.spyOn(instance, 'get').mockResolvedValue(mockResponse);

    const res = await vehiclesApi.getAgingActions(vehicleId);

    expect(getSpy).toHaveBeenCalledWith(expectedUrl);
    expect(res).toBe(mockResponse);
  });

  it('getMakes calls instance.get and returns makes', async () => {
    const mockResponse = { data: { status: 200, success: true, data: [{ value: 'Toyota', label: 'Toyota' }] } } as any;
    const getSpy = vi.spyOn(instance, 'get').mockResolvedValue(mockResponse);

    const res = await vehiclesApi.getMakes();

    expect(getSpy).toHaveBeenCalledWith(endpoint.vehicles.makes);
    expect(res).toBe(mockResponse);
  });

  it('getModelsByMake calls instance.get with encoded make', async () => {
    const make = 'Land Rover';
    const expectedUrl = endpoint.vehicles.modelsByMake.replace(':make', encodeURIComponent(make));
    const mockResponse = { data: { status: 200, success: true, data: ['Model1', 'Model2'] } } as any;
    const getSpy = vi.spyOn(instance, 'get').mockResolvedValue(mockResponse);

    const res = await vehiclesApi.getModelsByMake(make);

    expect(getSpy).toHaveBeenCalledWith(expectedUrl);
    expect(res).toBe(mockResponse);
  });
});
